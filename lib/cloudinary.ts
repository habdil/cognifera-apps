import "server-only";

import { createHash } from "node:crypto";

type UploadResult = {
  secureUrl: string;
  publicId: string;
};

function getConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary belum dikonfigurasi (CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET)."
    );
  }

  return { cloudName, apiKey, apiSecret };
}

export async function uploadToCloudinary(
  file: Blob,
  folder: string
): Promise<UploadResult> {
  const { cloudName, apiKey, apiSecret } = getConfig();

  const timestamp = Math.floor(Date.now() / 1000);
  const fullFolder = `cognifera/${folder}`;

  // Signature: sorted params joined with '&', then the API secret appended.
  const toSign = `folder=${fullFolder}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(toSign).digest("hex");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", fullFolder);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.secure_url) {
    const message = result?.error?.message || `Cloudinary upload gagal (${response.status})`;
    throw new Error(message);
  }

  return { secureUrl: result.secure_url, publicId: result.public_id };
}
