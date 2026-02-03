"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReviewComments from "@/components/ReviewComments";

export default function BookDetailPage() {
  const { id: bookId } = useParams();
  const { data: session } = useSession();

  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "books", bookId as string, "reviews"),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) => {
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [bookId]);

  const submitReview = async () => {
    if (!rating ||  !content.trim() || !session) return;

    await addDoc(collection(db, "books", bookId as string, "reviews"), {
      userId: session.user?.email,
      userName: session.user?.name,
      rating,
      content,
      createdAt: serverTimestamp(),
    });

    setRating(0);
    setContent("");
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>

      {session && (
        <div className="mb-10 space-y-3">
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            placeholder="Rating (1–5)"
            className="border px-3 py-2 rounded w-32"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your review..."
            className="border w-full p-3 rounded"
          />

          <button
            onClick={submitReview}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      )}

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      <div className="space-y-8">
        {reviews.map((r) => (
          <div key={r.id} className="border p-6 rounded-lg">
            <div className="flex justify-between mb-2">
              <p className="font-semibold">{r.userName}</p>
              <p>⭐ {r.rating}</p>
            </div>

            <p className="text-gray-700">{r.content}</p>

            <ReviewComments bookId={bookId as string} reviewId={r.id} />
          </div>
        ))}
      </div>
    </main>
  );
}