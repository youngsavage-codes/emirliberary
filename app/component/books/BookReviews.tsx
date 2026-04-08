type Review = {
  _id: string;
  reviewerName: string;
  rating: number;
  content: string;
};

type Props = {
  reviews: Review[];
};

export default function BookReviews({ reviews }: Props) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-[#8B5E3C] mb-6">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-6 grid grid-cols-2 gap-3">
          {reviews.map((r) => (
            <div key={r._id} className="border p-4 rounded-lg shadow-sm">
              <p className="font-semibold">{r.reviewerName}</p>
              <p className="text-yellow-500">
                {"★".repeat(r.rating)}{" "}
                {"☆".repeat(5 - r.rating)}
              </p>
              <p className="mt-1 text-gray-700">{r.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
