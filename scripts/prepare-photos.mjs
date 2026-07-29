/**
 * Підготовка фотографій проєкту до публікації.
 *
 *   npm run photos -- <slug> <файл...>
 *   npm run photos -- villa-toffee-vine ~/renders/*.jpg
 *
 * Що робить і навіщо саме так:
 *  - зберігає рідну роздільність (обрізає лише те, що більше 2560 px);
 *  - JPEG якість 94 без субдискретизації кольору (4:4:4) — саме субдискретизація
 *    розмиває кольорові межі й дрібну фактуру каменю та тканини;
 *  - mozjpeg для меншої ваги при тій самій якості;
 *  - .rotate() без аргументів застосовує EXIF-орієнтацію: фото з телефона
 *    інакше лягають боком (саме це сталося з Hero і фото салону).
 *
 * Це ВИХІДНИКИ. Користувач їх не завантажує: next/image віддає з них
 * AVIF/WebP потрібного розміру. Тому не зменшуйте фото заздалегідь
 * до 1200–1500 px і не зберігайте з якістю 75–80 — повернути деталі вже не вийде.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_SIDE = 2560;
const QUALITY = 94;

const [slug, ...files] = process.argv.slice(2);

if (!slug || files.length === 0) {
  console.error("Використання: npm run photos -- <slug> <файл...>");
  process.exit(1);
}

const outDir = path.join(process.cwd(), "public", "projects", slug);
await mkdir(outDir, { recursive: true });

for (const file of files) {
  const name = path.basename(file).replace(/\.[^.]+$/, "").toLowerCase();
  const out = path.join(outDir, `${name}.jpg`);

  const image = sharp(file, { failOn: "none" }).rotate();
  const { width = 0, height = 0 } = await image.metadata();
  const resize =
    Math.max(width, height) > MAX_SIDE
      ? { width: width >= height ? MAX_SIDE : undefined, height: height > width ? MAX_SIDE : undefined, fit: "inside", kernel: "lanczos3" }
      : null;

  await (resize ? image.resize(resize) : image)
    .jpeg({ quality: QUALITY, chromaSubsampling: "4:4:4", mozjpeg: true, progressive: true })
    .toFile(out);

  console.log(`${path.basename(out)} готово`);
}

const written = await readdir(outDir);
console.log(`\n${written.length} файлів у public/projects/${slug}/`);
console.log("Далі: додайте шляхи у content/projects.ts (cover + gallery).");
