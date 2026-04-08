/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/zazzau-e-library/sanityImage";

type Props = {
  books: any[];
  category: string;
};

export default function RelatedBooks({ books, category }: Props) {
  return (
    <div className="mt-20 md:col-span-3">
      <h2 className="text-3xl font-bold text-[#8B5E3C] mb-8">More in {category}</h2>
      {books.length === 0 ? (
        <p>No related books found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((b) => (
            <Link
              href={`/books/${b.slug}`}
              key={b._id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              {b.coverImage ? (
                <Image
                  src={urlFor(b.coverImage)}
                  alt={b.title}
                  width={300}
                  height={400}
                  className="rounded-lg mb-3 object-cover w-full h-64"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-3">
                  No Image
                </div>
              )}
              <h3 className="font-semibold text-lg text-[#8B5E3C] line-clamp-1">
                {b.title}
              </h3>
              <p className="text-gray-600 text-sm">{b.author}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
