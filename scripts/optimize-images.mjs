import sharp from "sharp";
import { readdirSync, renameSync, unlinkSync, existsSync } from "fs";
import { join } from "path";

const PUBLIC = "public/images";

const CONFIGS = [
  { name: "about-hero.webp",  width: 1200, quality: 75 },
  { name: "amenity-bar.webp",  width: 700,  quality: 75 },
  { name: "amenity-lounge.webp", width: 700, quality: 75 },
];

async function main() {
  const files = readdirSync(PUBLIC).filter(f => f.endsWith(".webp"));

  for (const file of files) {
    const config = CONFIGS.find(c => c.name === file);
    const src = join(PUBLIC, file);
    const tmp = join(PUBLIC, file.replace(".webp", ".tmp.webp"));

    const img = sharp(src);
    const meta = await img.metadata();
    const opts = { quality: config ? config.quality : 70 };

    let pipeline = img;
    if (config?.width && meta.width && meta.width > config.width) {
      pipeline = pipeline.resize({ width: config.width, withoutEnlargement: true });
    } else if (meta.width > 1600) {
      pipeline = pipeline.resize({ width: 1600, withoutEnlargement: true });
    }

    await pipeline.webp(opts).toFile(tmp);

    const orig = (await sharp(src).metadata()).size;
    const optimized = (await sharp(tmp).metadata()).size;

    renameSync(tmp, src);
    console.log(`${file}: ${orig} → ${optimized} bytes (${((1 - optimized/orig)*100).toFixed(1)}% savings)`);
  }
}

main().catch(console.error);
