import type { Express } from "express";
import fs from "node:fs";
import path from "node:path";
import { ENV } from "./env";

/**
 * Directories checked for a locally committed copy of a storage asset, before
 * falling back to the Manus Forge API. Covers both the source layout used in
 * development and the built layout used by `pnpm start`.
 *
 * Resolved from the working directory rather than `import.meta.dirname`, which
 * is undefined when this module is bundled into a CommonJS output.
 */
const LOCAL_ASSET_DIRS = [
  path.resolve(process.cwd(), "client", "public", "manus-storage"),
  path.resolve(process.cwd(), "dist", "public", "manus-storage"),
];

/**
 * Resolve a storage key to a committed file, or null if none exists.
 * Keys come from the request path, so candidates that escape the asset
 * directory are rejected rather than served.
 */
function resolveLocalAsset(key: string): string | null {
  for (const dir of LOCAL_ASSET_DIRS) {
    const candidate = path.resolve(dir, key);
    if (candidate !== dir && !candidate.startsWith(dir + path.sep)) continue;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    // Assets committed to the repository are served directly, so the page does
    // not need Forge credentials to render. The proxy below stays as the
    // fallback for keys that are not checked in.
    const localAsset = resolveLocalAsset(key);
    if (localAsset) {
      res.sendFile(localAsset);
      return;
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}
