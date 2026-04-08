/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/zazzau-e-library/client";


export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { bookId, reviewerName, reviewerEmail, rating, content } = JSON.parse(req.body);

    try {
      // Create review document
      const newReview = await client.create({
        _type: "review",
        book: { _type: "reference", _ref: bookId },
        reviewerName,
        reviewerEmail,
        rating,
        content,
        date: new Date().toISOString(),
      });

      // Fetch all reviews to update average
      const reviews = await client.fetch(
        `*[_type=="review" && book._ref == $bookId]{rating}`,
        { bookId }
      );

      const avgRating =
        reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / reviews.length;

      await client.patch(bookId).set({ averageRating: avgRating }).commit();

      res.status(200).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to submit review" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
