export const SITE_URL = "https://www.cognifera.web.id";

/**
 * Open Graph-safe image URL for link previews (WhatsApp, Telegram, X, ...).
 * Link scrapers need absolute URLs, and WhatsApp skips images much over
 * ~600KB, so Cloudinary sources get a 1200x630 JPEG transformation. Use
 * `pad` for portrait sources (book covers) to letterbox instead of crop.
 */
export function ogImageUrl(src: string, fit: "fill" | "pad" = "fill"): string {
  const absolute = src.startsWith("http") ? src : `${SITE_URL}${src}`;
  if (
    !absolute.startsWith("https://res.cloudinary.com/") ||
    !absolute.includes("/upload/")
  ) {
    return absolute;
  }
  const crop = fit === "pad" ? "c_pad,b_white" : "c_fill,g_auto";
  return absolute.replace(
    "/upload/",
    `/upload/f_jpg,q_auto:good,w_1200,h_630,${crop}/`
  );
}
