import { BookData } from "@/types/publications";

const defaultWhatsAppNumber = "6285920173338";

export function formatBookPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function getBookHref(book: Pick<BookData, "slug">) {
  return `/publications/books/${book.slug}`;
}

export function getBookInquiryUrl(book: Pick<BookData, "title" | "slug">) {
  const message = `Halo, saya tertarik dengan buku "${book.title}". Bisa minta informasi lebih lanjut? https://www.cognifera.web.id/publications/books/${book.slug}`;
  return `https://api.whatsapp.com/send/?phone=${defaultWhatsAppNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}
