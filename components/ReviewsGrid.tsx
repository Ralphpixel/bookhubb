"use client";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import ReviewCard from "./ReviewCard";

export default function ReviewsGrid({ currentUserId }: any) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const q = query(
        collection(db, "reviews"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No reviews yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {reviews.map(r => (
        <ReviewCard key={r.id} review={r} currentUserId={currentUserId} />
      ))}
    </div>
  );
}
