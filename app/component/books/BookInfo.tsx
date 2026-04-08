/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { urlFor } from "@/zazzau-e-library/sanityImage";

type Props = {
  book: any;
};

export default function BookInfo({ book }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="relative w-full md:w-1/3 h-96">
        {book.coverImage ? (
          <Image
            src={urlFor(book.coverImage)}
            alt={book.title}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <span>No Cover Image</span>
          </div>
        )}
      </div>

      <div className="md:w-2/3">
        <h1 className="text-4xl font-bold text-[#8B5E3C]">{book.title}</h1>
        <p className="text-lg mt-2">
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p className="text-lg mt-1">
          <span className="font-semibold">Category:</span> {book.category}
        </p>
        <p className="text-lg mt-1">
          <span className="font-semibold">Published Year:</span> {book.publishedYear}
        </p>
        <p className="mt-4 text-gray-700">{book.summary}</p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Average Rating:</h2>
          <p className="text-yellow-500 text-xl">
            {"★".repeat(Math.round(book.averageRating || 0))}
            {"☆".repeat(5 - Math.round(book.averageRating || 0))}{" "}
            ({book.averageRating?.toFixed(1) || "0.0"})
          </p>
        </div>

        {book.fileUrl && (
          <a
            href={book.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-[#8B5E3C] text-white px-6 py-3 rounded-lg hover:bg-[#A67C5B]"
          >
            📕 Download PDF
          </a>
        )}
      </div>
    </div>
  );
}
