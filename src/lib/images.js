import sharp from 'sharp';
import path from 'node:path';

// Build-time only. Width descriptors must match the capped output dimensions.
const metadata = new Map();
export async function responsiveImage(source, preferredWidth = 480) {
  if (!metadata.has(source)) metadata.set(source, sharp(path.join('public', source)).metadata());
  const { width: sourceWidth, height: sourceHeight } = await metadata.get(source);
  const name = path.parse(source).name;
  const sizes = sourceWidth <= 480 || source === '/assets/images/contact-me.webp' ? [480] : [480, 800];
  const variants = sizes.map(size => ({ size, src: `/assets/images/optimized/${name}-${size}.webp`, width: Math.min(size, sourceWidth) }));
  const preferredVariant = variants.find(variant => variant.size === preferredWidth) ?? variants.at(-1);
  const width = preferredVariant.width;
  return {
    src: preferredVariant.src,
    srcset: variants.map(variant => `${variant.src} ${variant.width}w`).join(', '),
    width,
    height: Math.round(sourceHeight * width / sourceWidth),
  };
}
