/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import BookCard from "../shared/bookCars";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { client } from "@/zazzau-e-library/client";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest Rated", value: "highest" },
  { label: "Lowest Rated", value: "lowest" },
];

type Book = {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  coverImage: any;
  summary: string;
  category: string;
  publishedYear: number;
  averageRating?: number;
  _createdAt: string;
  dateAdded: string;
};

const BooksSection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch Sanity books
  const fetchSanityBooks = async (): Promise<Book[]> => {
    try {
      const query = `
        *[_type=="book"]{
          _id,
          title,
          slug,
          author,
          coverImage,
          summary,
          "category": category->title,
          publishedYear,
          averageRating,
          _createdAt
        }
      `;
      const data: Book[] = await client.fetch(query);
      return data.map(b => ({ ...b, dateAdded: b._createdAt }));
    } catch (err) {
      console.error("Failed to fetch Sanity books:", err);
      return [];
    }
  };

  // Fetch Gutendex books
  const fetchGutendexBooks = async (): Promise<Book[]> => {
    try {
      const response = await fetch("https://gutendex.com/books");
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
        dateAdded: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Failed to fetch Gutendex books:", err);
      return [];
    }
  };

  // Fetch all books (Sanity + Gutendex)
  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const [sanityBooks, gutendexBooks] = await Promise.all([fetchSanityBooks(), fetchGutendexBooks()]);
      const allBooks = [...sanityBooks, ...gutendexBooks];
      // Sort by dateAdded descending and pick latest 12
      allBooks.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      setBooks(allBooks.slice(0, 12));
    } catch (err) {
      console.error("Failed to fetch all books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  // Sort books by select option
  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case "oldest":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case "highest":
        return (b.averageRating || 0) - (a.averageRating || 0);
      case "lowest":
        return (a.averageRating || 0) - (b.averageRating || 0);
      default:
        return 0;
    }
  });

  // Split books into chunks for carousel slides (6 per slide)
  const chunkBooks = (arr: Book[], size: number) => {
    const chunks: Book[][] = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
  };
  const bookChunks = chunkBooks(sortedBooks, 6);

  return (
    <section className="py-20 mx-auto w-[90%] lg:flex lg:gap-10">
      <div className="hidden lg:block lg:w-2/5">
        <Image
          src="/image.png"
          alt="Bookshelf"
          width={400}
          height={300}
          className="rounded-lg shadow-lg object-cover w-full"
        />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#8B5E3C] text-center lg:text-left">
            Featured Books & New Additions
          </h2>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
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
        </div>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading books...</p>
        ) : bookChunks.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No books found.</p>
        ) : (
          <Carousel opts={{ align: "center" }} className="w-full">
            <CarouselContent className="w-full">
              {bookChunks.map((chunk, slideIdx) => (
                <CarouselItem key={slideIdx} className="w-full">
                  <div className="grid gap-x-6 gap-y-8
                                  grid-cols-1 grid-rows-1 
                                  md:grid-cols-2 md:grid-rows-2 
                                  lg:grid-cols-3 lg:grid-rows-2">
                    {chunk.map((book) => (
                      <BookCard key={book._id} book={book} />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
