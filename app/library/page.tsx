/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import BookCard from "../component/shared/bookCars";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaArrowRight } from "react-icons/fa";
import { client } from "@/zazzau-e-library/client";

type Category = {
  _id: string;
  title: string;
};

type Book = {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  coverImage: { asset: { url: string } };
  summary: string;
  category: string;
  publishedYear: number;
  averageRating?: number;
  _createdAt: string;
};

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest Rated", value: "highest" },
  { label: "Lowest Rated", value: "lowest" },
];

const LibraryPage = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  // Fetch Categories from Sanity
  const fetchCategories = async () => {
    try {
      const data = await client.fetch(
        `*[_type == "category"] | order(title asc){ _id, title }`
      );
      setCategories([{ _id: "all", title: "All" }, ...data]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch Books from Sanity
  const fetchSanityBooks = async (): Promise<Book[]> => {
    try {
      const query = `*[_type=="book"]{
        _id,
        title,
        "slug": slug,
        author,
        coverImage,
        summary,
        "category": category->title,
        publishedYear,
        averageRating,
        _createdAt
      } | order(_createdAt desc)`;
      const data: Book[] = await client.fetch(query);
      return data;
    } catch (error) {
      console.error("Failed to fetch books from Sanity:", error);
      return [];
    }
  };

  // Fetch Books from Gutendex (African history, religion, culture)
  const fetchGutendexBooks = async (): Promise<Book[]> => {
    try {
      const response = await fetch(
        "https://gutendex.com/books"
      );
      const json = await response.json();

      return json.results.map((item: any) => ({
        _id: `gutendex-${item.id}`,
        title: item.title,
        slug: { current: `gutendex-${item.id}` },
        author: item.authors?.map((a: any) => a.name).join(", ") || "Unknown Author",
        coverImage: { asset: { url: item.formats["image/jpeg"] || "/placeholder.jpg" } },
        summary: item.summaries?.[0] || item.subjects?.slice(0, 3).join(", ") || "No summary available.",
        category: item.bookshelves?.[0] || "Public Domain",
        publishedYear: 1900,
        averageRating: Math.min(item.download_count / 10000, 5),
        _createdAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Failed to fetch books from Gutendex:", error);
      return [];
    }
  };

  // Initial Fetch (Sanity + Gutendex)
  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      try {
        const [sanityBooks, gutendexBooks] = await Promise.all([
          fetchSanityBooks(),
          fetchGutendexBooks(),
        ]);
        setBooks([...sanityBooks, ...gutendexBooks]);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchAllBooks();
  }, []);

  // Filter & Sort Books
  const filteredBooks = books
    .filter((book) => {
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;
      const matchesQuery =
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
        case "oldest":
          return new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime();
        case "highest":
          return (b.averageRating || 0) - (a.averageRating || 0);
        case "lowest":
          return (a.averageRating || 0) - (b.averageRating || 0);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: any) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* HERO / SEARCH */}
      <section className="py-16 bg-[#F3E9E0]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[#8B5E3C] mb-4">Explore Our Library</h1>
          <p className="text-gray-700 mb-8">Search books, authors, or topics in the Zazzua E-Library</p>

          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white shadow-lg rounded-full overflow-hidden border border-gray-200 transition-all hover:shadow-xl focus-within:shadow-xl"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books, authors, or topics..."
              className="flex-grow px-6 py-4 text-gray-800 placeholder-gray-400 text-lg focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#8B5E3C] text-white px-6 py-4 font-semibold rounded-full hover:bg-[#A67C5B] transition-colors text-lg"
            >
              Search
              <FaArrowRight color="white" />
            </button>
          </form>

          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setSelectedCategory(cat.title);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat.title
                    ? "bg-[#8B5E3C] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-[#A67C5B] hover:text-white"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HEADER + SORT */}
      <section className="py-6 lg:max-w-[90%] mx-auto px-5 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[#8B5E3C]">Books</h2>
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* BOOK GRID */}
      <section className="py-6 lg:max-w-[90%] mx-auto px-5">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading books...</p>
        ) : paginatedBooks.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {paginatedBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === i + 1
                    ? "bg-[#8B5E3C] text-white border-[#8B5E3C]"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default LibraryPage;
