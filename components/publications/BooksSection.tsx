"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, Filter, Eye, ShoppingCart, Calendar, Globe, Users, DollarSign } from "lucide-react";
import { formatBookPrice, getBookHref, getBookInquiryUrl } from "@/lib/books";
import { mockBooks } from "@/mock-data/publications";
import { BookData } from "@/types/publications";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const BooksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"year" | "title" | "price">("year");

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "textbook", label: "Textbooks" },
    { id: "reference", label: "Reference Books" },
    { id: "monograph", label: "Monographs" },
    { id: "proceedings", label: "Conference Proceedings" },
  ];

  const languages = [
    { id: "all", label: "All Languages" },
    { id: "id", label: "Bahasa Indonesia" },
    { id: "en", label: "English" },
  ];

  const filteredBooks = mockBooks
    .filter((book) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.authors.some((author) => author.toLowerCase().includes(query)) ||
        book.keywords.some((keyword) => keyword.toLowerCase().includes(query)) ||
        book.publisher.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "all" || book.category === selectedCategory;
      const matchesLanguage =
        selectedLanguage === "all" || book.language === selectedLanguage;

      return matchesSearch && matchesCategory && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.publicationYear - a.publicationYear;
        case "title":
          return a.title.localeCompare(b.title);
        case "price":
          return (a.price || 0) - (b.price || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold text-[var(--color-foreground)]">
          Books
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--color-muted-foreground)]">
          Explore our collection of published textbooks, monographs, and
          conference proceedings across various academic disciplines.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
            <input
              type="text"
              placeholder="Search by title, authors, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] py-3 pl-10 pr-4 outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full rounded-lg border border-[var(--color-border)] bg-white py-6 pl-10 pr-8 outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--color-primary)]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="border-none">
                {categories.map((category) => (
                  <SelectItem
                    className="border-none bg-white hover:bg-gray-100"
                    key={category.id}
                    value={category.id}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Globe className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full rounded-lg border border-[var(--color-border)] bg-white py-6 pl-10 pr-8 outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--color-primary)]">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent className="border-none">
                {languages.map((language) => (
                  <SelectItem
                    className="border-none bg-white hover:bg-gray-100"
                    key={language.id}
                    value={language.id}
                  >
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as "year" | "title" | "price")}
          >
            <SelectTrigger className="w-48 rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--color-primary)]">
              <SelectValue placeholder="Sort by Year" />
            </SelectTrigger>
            <SelectContent className="border-none">
              <SelectItem className="border-none bg-white hover:bg-gray-100" value="year">
                Sort by Year
              </SelectItem>
              <SelectItem className="border-none bg-white hover:bg-gray-100" value="title">
                Sort by Title
              </SelectItem>
              <SelectItem className="border-none bg-white hover:bg-gray-100" value="price">
                Sort by Price
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-[var(--color-muted-foreground)]">
        Found {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="py-12 text-center">
          <div className="text-lg text-[var(--color-muted-foreground)]">
            No books found matching your criteria.
          </div>
        </div>
      )}
    </div>
  );
};

const BookCard = ({ book }: { book: BookData }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      case "pre-order":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available";
      case "out-of-stock":
        return "Out of Stock";
      case "pre-order":
        return "Pre-order";
      default:
        return availability;
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={getBookHref(book)} className="block">
        <div className="relative aspect-[3/4] bg-white p-3">
          <Image
            src={book.coverImage}
            alt={book.coverAlt ?? book.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-md bg-[var(--color-muted)] px-2 py-1 text-xs font-medium capitalize text-[var(--color-muted-foreground)]">
            {book.category.replace("-", " ")}
          </span>
          <span className="text-xs uppercase text-[var(--color-muted-foreground)]">
            {book.language === "id" ? "ID" : "EN"}
          </span>
        </div>

        <Link href={getBookHref(book)} className="block">
          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-[var(--color-foreground)]">
            {book.title}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
          <Users className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{book.authors.join(", ")}</span>
        </div>

        <div className="mb-3 flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span>
            {book.publisher} - {book.publicationYear}
          </span>
        </div>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {book.description}
        </p>

        <div className="mb-4 space-y-2 text-xs text-[var(--color-muted-foreground)]">
          <div>ISBN: {book.isbn}</div>
          <div>
            {book.pageLabel ?? (book.pages > 0 ? `${book.pages} pages` : "Jumlah halaman akan diperbarui")} -{" "}
            {book.format === "both" ? "Print & Digital" : book.format}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-1">
          {book.keywords.slice(0, 3).map((keyword, index) => (
            <span
              key={index}
              className="rounded-md bg-[var(--color-muted)] px-2 py-1 text-xs text-[var(--color-muted-foreground)]"
            >
              {keyword}
            </span>
          ))}
          {book.keywords.length > 3 && (
            <span className="px-2 py-1 text-xs text-[var(--color-muted-foreground)]">
              +{book.keywords.length - 3} more
            </span>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          {book.price && (
            <div className="flex items-center gap-1 text-lg font-bold text-[var(--color-primary)]">
              <DollarSign className="h-4 w-4" />
              {formatBookPrice(book.price)}
            </div>
          )}
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${getAvailabilityColor(book.availability)}`}
          >
            {getAvailabilityText(book.availability)}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            href={getBookHref(book)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
          >
            <Eye className="h-4 w-4" />
            Detail
          </Link>

          <Link
            href={book.purchaseUrl ?? getBookInquiryUrl(book)}
            target="_blank"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] transition-opacity hover:opacity-90"
          >
            <ShoppingCart className="h-4 w-4" />
            {book.purchaseUrl ? "Buy Now" : "Tanya"}
          </Link>
        </div>
      </div>
    </div>
  );
};
