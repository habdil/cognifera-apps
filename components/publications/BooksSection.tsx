"use client";

import { useState } from "react";
import { Search, Filter, ExternalLink, Eye, ShoppingCart, Calendar, Globe, BookOpen, Users, DollarSign } from "lucide-react";
import { mockBooks } from "@/mock-data/publications";
import { BookData } from "@/types/publications";

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
    { id: "proceedings", label: "Conference Proceedings" }
  ];

  const languages = [
    { id: "all", label: "All Languages" },
    { id: "id", label: "Bahasa Indonesia" },
    { id: "en", label: "English" }
  ];

  const filteredBooks = mockBooks
    .filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        book.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
        book.publisher.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
      const matchesLanguage = selectedLanguage === "all" || book.language === selectedLanguage;
      
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
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-4">
          Books
        </h2>
        <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
          Explore our collection of published textbooks, monographs, and conference proceedings across various academic disciplines.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)]" />
            <input
              type="text"
              placeholder="Search by title, authors, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)]" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full pl-10 pr-8 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white"
            >
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mt-4 flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "year" | "title" | "price")}
            className="px-4 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white"
          >
            <option value="year">Sort by Year</option>
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-[var(--color-muted-foreground)]">
        Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[var(--color-muted-foreground)] text-lg">
            No books found matching your criteria.
          </div>
        </div>
      )}
    </div>
  );
};

const BookCard = ({ book }: { book: BookData }) => {
  const handleCardClick = () => {
    window.location.href = `/publications/books/${book.id}`;
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      case 'pre-order':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'out-of-stock':
        return 'Out of Stock';
      case 'pre-order':
        return 'Pre-order';
      default:
        return availability;
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Book Cover Placeholder */}
      <div className="aspect-[3/4] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-6 flex items-center justify-center">
        <div className="text-white text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <div className="text-sm font-medium opacity-80">Book Cover</div>
        </div>
      </div>

      <div className="p-6">
        {/* Category and Language */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-1 rounded-md text-xs font-medium capitalize">
            {book.category.replace('-', ' ')}
          </span>
          <span className="text-xs text-[var(--color-muted-foreground)] uppercase">
            {book.language === 'id' ? 'ID' : 'EN'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2 line-clamp-2 leading-tight">
          {book.title}
        </h3>

        {/* Authors */}
        <div className="flex items-center gap-2 mb-3 text-sm text-[var(--color-muted-foreground)]">
          <Users className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{book.authors.join(", ")}</span>
        </div>

        {/* Publisher and Year */}
        <div className="flex items-center gap-2 mb-3 text-sm text-[var(--color-muted-foreground)]">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span>{book.publisher} • {book.publicationYear}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--color-muted-foreground)] line-clamp-3 mb-4 leading-relaxed">
          {book.description}
        </p>

        {/* Book Details */}
        <div className="space-y-2 mb-4 text-xs text-[var(--color-muted-foreground)]">
          <div>ISBN: {book.isbn}</div>
          <div>{book.pages} pages • {book.format === 'both' ? 'Print & Digital' : book.format}</div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1 mb-4">
          {book.keywords.slice(0, 3).map((keyword, index) => (
            <span
              key={index}
              className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-1 rounded-md text-xs"
            >
              {keyword}
            </span>
          ))}
          {book.keywords.length > 3 && (
            <span className="text-xs text-[var(--color-muted-foreground)] px-2 py-1">
              +{book.keywords.length - 3} more
            </span>
          )}
        </div>

        {/* Price and Availability */}
        <div className="flex items-center justify-between mb-4">
          {book.price && (
            <div className="flex items-center gap-1 text-lg font-bold text-[var(--color-primary)]">
              <DollarSign className="h-4 w-4" />
              {formatPrice(book.price)}
            </div>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(book.availability)}`}>
            {getAvailabilityText(book.availability)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={`/publications/books/${book.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[var(--color-border)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm font-medium"
          >
            <Eye className="h-4 w-4" />
            Preview
          </a>
          
          {book.availability === 'available' && (
            <button 
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <ShoppingCart className="h-4 w-4" />
              {book.availability === 'pre-order' ? 'Pre-order' : 'Buy Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};