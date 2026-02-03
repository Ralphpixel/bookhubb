import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export function listenToComments(
  bookId: string,
  reviewId: string,
  callback: (comments: any[]) => void
) {
  const q = query(
    collection(db, "books", bookId, "reviews", reviewId, "comments"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
}

export async function addComment(
  bookId: string,
  reviewId: string,
  data: {
    userId: string;
    userName: string;
    content: string;
  }
) {
  await addDoc(
    collection(db, "books", bookId, "reviews", reviewId, "comments"),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );
}