"use client";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import ReviewCard from "./ReviewCard";

export default function ReviewsList() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);

      const q = query(
        collection(db, "reviews"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      setReviews(
        snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }))
      );

      setLoading(false);
    }

    loadReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
