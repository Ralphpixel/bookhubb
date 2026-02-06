import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
// import { db } from "@/lib/firebase";

export async function syncUserReviews(
  userId: string,
  username: string,
  photoURL: string | null
) {
  const q = query(
    collection(db, "reviews"),
    where("userId", "==", userId)
  );

  const snap = await getDocs(q);

  const updates = snap.docs.map((docSnap) =>
    updateDoc(docSnap.ref, {
      username,
      photoURL,
    })
  );

  await Promise.all(updates);
}