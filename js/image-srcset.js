// Images adaptatives : une même image en plusieurs largeurs, pour ne pas envoyer 1 600 px à un téléphone.
export const WIDTHS = [480, 800, 1200, 1600];

export function buildSrcset(path, widths = WIDTHS, format = "webp") {
  const base = path.replace(/\.[a-z0-9]+$/i, "");
  return widths.map((width) => `${base}-${width}.${format} ${width}w`).join(", ");
}

export function buildPicture({ path, alt, sizes = "(min-width: 1100px) 1100px, 100vw" }) {
  const fallback = path.replace(/\.[a-z0-9]+$/i, "-800.jpg");
  return [
    "<picture>",
    `  <source type="image/webp" srcset="${buildSrcset(path)}" sizes="${sizes}">`,
    `  <img src="${fallback}" alt="${alt}" loading="lazy" decoding="async">`,
    "</picture>",
  ].join("\n");
}
