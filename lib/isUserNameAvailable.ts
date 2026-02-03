import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function isUsernameAvailable(username: string, userId: string) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username)
  );

  const snap = await getDocs(q);

  if (snap.empty) return true;

  // Allow same user to keep username
  return snap.docs.every(doc => doc.id === userId);
}