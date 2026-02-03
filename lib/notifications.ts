import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function createNotification({
  userId,
  fromUserId,
  fromUsername,
  type,
  reviewId,
}: {
  userId: string;
  fromUserId: string;
  fromUsername: string;
  type: "like" | "comment";
  reviewId: string;
}) {
  if (userId === fromUserId) return; // don't notify self

  await addDoc(collection(db, "notifications"), {
    userId,
    fromUserId,
    fromUsername,
    type,
    reviewId,
    read: false,
    createdAt: serverTimestamp(),
  });
}