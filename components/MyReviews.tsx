"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { db } from "@/lib/firebase";
import { useSession } from "next-auth/react";
import ReviewCard from "./ReviewCard";
import { db } from "../lib/firebase";

export default function MyReviews() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const q = query(
      collection(db, "reviews"),
      where("userId", "==", session.user.id)
    );

    const unsub = onSnapshot(q, (snap) => {
      setReviews(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });

    return () => unsub();
  }, [session]);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">My Reviews</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
}
