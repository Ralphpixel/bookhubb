"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReviewCard from "@/components/ReviewCard";
import Image from "next/image";

export default function PublicProfile() {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const userSnap = await getDocs(
        query(collection(db, "users"), where("username", "==", username))
      );

      if (userSnap.empty) return;

      const userData = userSnap.docs[0];
      setUser(userData.data());

      const reviewsSnap = await getDocs(
        query(
          collection(db, "reviews"),
          where("userId", "==", userData.id)
        )
      );

      setReviews(
        reviewsSnap.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }))
      );
    };

    load();
  }, [username]);

  if (!user) return <div className="mt-20 text-center">User not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <div className="flex items-center gap-4 mb-10">
        {user.photoURL && (
          <Image
            src={user.photoURL}
            alt="avatar"
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <h1 className="text-3xl font-bold">{user.username}</h1>
      </div>

      <div className="space-y-6">
        {reviews.map(r => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
}