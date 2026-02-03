"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  increment,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createNotification } from "@/lib/notifications";

export default function LikeButton({
  reviewId,
  reviewOwnerId,
}: {
  reviewId: string;
  reviewOwnerId: string;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reviewRef = doc(db, "reviews", reviewId);
    const unsubReview = onSnapshot(reviewRef, snap => {
      if (snap.exists()) setCount(snap.data().likeCount || 0);
    });

    if (!userId) return () => unsubReview();

    const likeRef = doc(db, "reviews", reviewId, "likes", userId);
    const unsubLike = onSnapshot(likeRef, snap => {
      setLiked(snap.exists());
    });

    return () => {
      unsubReview();
      unsubLike();
    };
  }, [reviewId, userId]);

  const toggleLike = async () => {
    if (!userId) return alert("Login required");

    const likeRef = doc(db, "reviews", reviewId, "likes", userId);
    const reviewRef = doc(db, "reviews", reviewId);

    if (liked) {
      await deleteDoc(likeRef);
      await updateDoc(reviewRef, { likeCount: increment(-1) });
    } else {
      await setDoc(likeRef, { createdAt: serverTimestamp() });
      await updateDoc(reviewRef, { likeCount: increment(1) });

      await createNotification({
        userId: reviewOwnerId,
        fromUserId: userId,
        fromUsername: session?.user?.name || "Someone",
        type: "like",
        reviewId,
      });
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`text-sm px-3 py-1 rounded ${
        liked ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
    >
      ❤️ {count}
    </button>
  );
}