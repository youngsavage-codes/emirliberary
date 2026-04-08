/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { urlFor } from "@/zazzau-e-library/sanityImage";

const renderStars = (rating: any) => {
  const fullStars = Math.floor(rating || 0);
  const halfStar = rating - fullStars >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) stars.push("★");
  if (halfStar) stars.push("☆");
  while (stars.length < 5) stars.push("☆");

  return stars.join("");
};

const BookCard = ({ book }: any) => {
  // Determine image source: use Sanity urlFor only if the object has _type 'image'
  const imageUrl = urlFor(book.coverImage);


  return (
    <Card className="hover:shadow-xl transition flex flex-col py-0 pb-5">
      <div className="relative w-full h-56">
        <Image
          src={imageUrl}
          alt={book.title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <span className="mt-2 inline-block bg-[#F3E9E0] text-[#8B5E3C] text-xs font-semibold px-3 py-1 rounded-full text-center w-fit absolute top-3 right-5">
          {book.category}
        </span>
      </div>

      <CardContent className="flex flex-col flex-1">
        <CardHeader className="text-center">
          <CardTitle className="text-[#8B5E3C]">
            <Link href={`/library/${book.slug.current}`}>{book.title}</Link>
          </CardTitle>
          <p className="text-gray-700 text-sm mt-1">by {book.author}</p>
        </CardHeader>
        <CardDescription className="text-gray-600 text-sm mt-2 text-center flex-1 line-clamp-3">
          {book.summary}
        </CardDescription>
        <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
          <span className="text-xs">{book.publishedYear}</span>
          <span className="text-yellow-500">{renderStars(book.averageRating)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
