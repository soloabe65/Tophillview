import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const OUT = "out";

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const htmlFiles = walk(OUT).filter(f => f.endsWith(".html"));
const cssFiles = walk(join(OUT, "_next/static")).filter(f => f.endsWith(".css"));

for (const htmlPath of htmlFiles) {
  let html = readFileSync(htmlPath, "utf-8");
  let changed = false;

  for (const cssPath of cssFiles) {
    const cssHref = cssPath.replace(/\\/g, "/").replace("out/", "/");
    const linkRegex = new RegExp(
      `<link[^>]*href="[^"]*${cssHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*/?>`,
      "g"
    );

    if (linkRegex.test(html)) {
      const cssContent = readFileSync(cssPath, "utf-8");
      html = html.replace(linkRegex, `<style>${cssContent}</style>`);
      changed = true;
      console.log(`Inlined: ${cssHref} into ${htmlPath}`);
    }
  }

  if (changed) {
    writeFileSync(htmlPath, html, "utf-8");
  }
}

console.log("Done inlining CSS into", htmlFiles.length, "HTML files");
