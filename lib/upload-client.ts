/**
 * Client helper for uploading images through the admin upload endpoint.
 * Requires an authenticated admin session (the endpoint lives under /api/admin).
 */

export type UploadFolder = "books" | "articles";

export async function uploadImage(
  file: File,
  folder: UploadFolder = "articles"
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || `Upload gagal (${response.status})`);
  }

  return { url: result.data.url as string };
}
