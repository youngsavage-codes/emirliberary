/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { client } from "@/zazzau-e-library/client";

type Props = {
  bookId: string;
  onAddReview: (newReview: any) => void;
};

export default function ReviewForm({ bookId, onAddReview }: Props) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !rating) return alert("Please fill all fields");

    setLoading(true);

    try {
      // 1️⃣ Create review document
      const newReview = await client.create({
        _type: "review",
        book: { _type: "reference", _ref: bookId },
        reviewerName: name,
        reviewerEmail: email,
        rating,
        content,
        date: new Date().toISOString(),
      });

      // 2️⃣ Add the review reference to the book's reviews array
      await client
        .patch(bookId)
        .append("reviews", [{ _type: "reference", _ref: newReview._id }])
        .commit();

      // 3️⃣ Fetch all reviews to calculate average rating
      const reviews = await client.fetch(
        `*[_type=="review" && book._ref == $bookId]{rating}`,
        { bookId }
      );

      const avgRating =
        reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / reviews.length;

      // 4️⃣ Update the book's averageRating
      await client.patch(bookId).set({ averageRating: avgRating }).commit();

      // 5️⃣ Notify parent component and reset form
      onAddReview(newReview);
      setRating(0);
      setName("");
      setEmail("");
      setContent("");

      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="bg-white border p-6 rounded-lg shadow-md self-start sticky top-20">
      <h2 className="text-2xl font-bold text-[#8B5E3C] mb-6">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="number"
          placeholder="Rating (1–5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min={1}
          max={5}
          className="w-full border p-3 rounded-lg"
          required
        />
        <textarea
          placeholder="Write your review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#8B5E3C] text-white px-6 py-3 rounded-lg hover:bg-[#A67C5B] disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </aside>
  );
}
