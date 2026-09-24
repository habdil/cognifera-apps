"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

function isCloudinaryUrl(src: ImageProps["src"]): src is string {
  return typeof src === "string" && src.startsWith("https://res.cloudinary.com/");
}

// Cloudinary already is an image CDN: request the right size and format via
// URL transformations and skip Next's /_next/image proxy entirely (the proxy
// re-fetches server-side, which adds latency and a failure point).
function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  return src.replace("/upload/", `/upload/f_auto,q_${quality ?? "auto"},w_${width}/`);
}

/**
 * Drop-in replacement for next/image for user-uploaded content images.
 * Cloudinary URLs are served straight from the Cloudinary CDN; anything else
 * (legacy /public paths) falls through to the default Next optimizer.
 */
export function ContentImage(props: ImageProps) {
  if (isCloudinaryUrl(props.src)) {
    return <Image {...props} loader={cloudinaryLoader} />;
  }
  return <Image {...props} />;
}
