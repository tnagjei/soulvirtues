// input: Built site in dist/ or public/sitemap.xml, IndexNow key, and site URL
// output: Submission of full URL list to IndexNow API (Bing/Yandex/etc.) and status report
// pos: scripts/submit_indexnow.mjs (更新规则：文件变更需同步本注释与 scripts/README.md)

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = (process.env.SITE_URL || "https://soulvirtues.org").replace(/\/$/, "");
const host = new URL(siteUrl).host;
const indexNowKey = "e74f83b2d1c94a5ea6e0b7f8c9d1a2e3";
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;
const endpoint = "https://api.indexnow.org/indexnow";

async function getAllDistUrls() {
  const distDir = path.join(root, "dist");
  const urls = [];

  async function scan(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.name === "index.html") {
        const relativeDir = path.relative(distDir, dir);
        if (relativeDir === "") {
          urls.push(`${siteUrl}/`);
        } else {
          urls.push(`${siteUrl}/${relativeDir}/`);
        }
      }
    }
  }

  try {
    await scan(distDir);
  } catch (e) {
    return getSitemapUrls();
  }
  return urls;
}

async function getSitemapUrls() {
  const sitemapPath = path.join(root, "public", "sitemap.xml");
  const content = await readFile(sitemapPath, "utf-8");
  const matches = [...content.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map((m) => m[1].trim()).filter(Boolean);
}

async function main() {
  const urls = await getAllDistUrls();
  const urlList = [...new Set(urls)].sort();

  if (!urlList.length) {
    console.error("No URLs found to submit. Please run `npm run build` first.");
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow for host: ${host}...`);

  const payload = {
    host,
    key: indexNowKey,
    keyLocation,
    urlList,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const body = await res.text();
    if (res.status === 200 || res.status === 202) {
      console.log(`✅ IndexNow submission successful! Status: ${res.status} ${res.statusText}`);
      console.log(`Indexed endpoints will notify Bing, Yandex, Naver, Seznam, and participating search engines.`);
    } else {
      console.error(`❌ IndexNow submission failed with status ${res.status}: ${body}`);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Failed to contact IndexNow API:", error);
    process.exit(1);
  }
}

main();
