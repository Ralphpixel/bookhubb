// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy,
//   startAt,
//   endAt,
// } from "firebase/firestore";
// import { db } from "./firebase";

// export async function searchBooks({
//   title,
//   author,
//   genre,
// }: {
//   title?: string;
//   author?: string;
//   genre?: string;
// }) {
//   let q = query(collection(db, "books"));

//   // Title search (prefix search)
//   if (title) {
//     const text = title.toLowerCase();
//     q = query(
//       q,
//       orderBy("titleLower"),
//       startAt(text),
//       endAt(text + "\uf8ff")
//     );
//   }

//   // Author filter
//   if (author && author !== "All authors") {
//     q = query(q, where("authors", "array-contains", author));
//   }

//   // Genre filter
//   if (genre && genre !== "All genres") {
//     q = query(q, where("genres", "array-contains", genre));
//   }

//   const snap = await getDocs(q);

//   return snap.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// }
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

type SearchParams = {
  title?: string;
  author?: string;
  genre?: string;
};

export async function searchBooks({
  title = "",
  author = "All authors",
  genre = "All genres",
}: SearchParams) {
  const ref = collection(db, "books");

  let q = query(ref);

  // Firestore DOES NOT support partial text search
  // so we filter client-side for title
  if (author !== "All authors") {
    q = query(q, where("authors", "array-contains", author));
  }

  if (genre !== "All genres") {
    q = query(q, where("genre", "==", genre));
  }

  const snapshot = await getDocs(q);

  let results = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];

  // client-side title filter
  if (title.trim()) {
    results = results.filter((book) =>
      book.title?.toLowerCase().includes(title.toLowerCase())
    );
  }

  return results;
}
