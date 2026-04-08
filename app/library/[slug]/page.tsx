/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/zazzau-e-library/client";
import BookReviews from "@/app/component/books/BookReviews";
import BookInfo from "@/app/component/books/BookInfo";
import RelatedBooks from "@/app/component/books/RelatedBooks";
import ReviewForm from "@/app/component/books/ReviewForm";

export default function BookDetails() {
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [relatedBooks, setRelatedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  // Fetch book from Gutendex
  const fetchGutendexBook = async (bookSlug: string) => {
    try {
      const id = bookSlug.replace("gutendex-", "");
      const response = await fetch(`https://gutendex.com/books/${id}`);
      const item = await response.json();
      return {
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
      };
    } catch (err) {
      console.error("Failed to fetch Gutendex book:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      if (!slug || Array.isArray(slug)) return;
      setLoading(true);

      try {
        let bookData = null;

        if (slug.startsWith("gutendex-")) {
          bookData = await fetchGutendexBook(slug);
        } else {
          // Fetch from Sanity
          const query = `*[_type=="book" && slug.current == $slug][0]{
            _id,
            title,
            author,
            summary,
            publishedYear,
            coverImage,
            "category": category->title,
            averageRating,
            "fileUrl": file.asset->url,
            _createdAt
          }`;
          bookData = await client.fetch(query, { slug });
        }

        if (!bookData) return;
        setBook(bookData);

        // Fetch Sanity reviews only for Sanity books
        if (!slug.startsWith("gutendex-")) {
          const reviewsQuery = `*[_type=="review" && book._ref == $bookId]{
            _id,
            reviewerName,
            reviewerEmail,
            rating,
            content,
            date
          }`;
          const bookReviews = await client.fetch(reviewsQuery, { bookId: bookData._id });
          setReviews(bookReviews || []);
        }

        // Fetch related books from Sanity only if original book is from Sanity
        if (!slug.startsWith("gutendex-") && bookData?.category) {
          const relatedQuery = `*[_type=="book" && category->title == $category && slug.current != $slug][0...4]{
            _id,
            title,
            author,
            coverImage,
            "slug": slug.current
          }`;
          const related = await client.fetch(relatedQuery, {
            category: bookData.category,
            slug,
          });
          setRelatedBooks(related || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  const handleAddReview = async (newReview: any) => {
    setReviews((prev) => [...prev, newReview]);

    if (typeof slug === "string" && !slug.startsWith("gutendex-") && book) {
      // Update average rating for Sanity books only
      const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) + newReview.rating) / (reviews.length + 1);
      await client.patch(book._id).set({ averageRating: avgRating }).commit();
      setBook({ ...book, averageRating: avgRating });
    }
  };

  if (loading || !book) return <div className="text-center py-16">Loading {slug}...</div>;

  return (
    <div className="mx-auto lg:w-9/12 py-16 px-5 grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <BookInfo book={book} />
        <BookReviews reviews={reviews} />
      </div>

      {typeof slug === "string" && !slug.startsWith("gutendex-") && (
        <ReviewForm bookId={book._id} onAddReview={handleAddReview} />
      )}

      <RelatedBooks books={relatedBooks} category={book.category} />
    </div>
  );
}
