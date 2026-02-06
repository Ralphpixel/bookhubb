// import { db } from "./firebase";
// import {
//   collection,
//   doc,
//   getDoc,
//   serverTimestamp,
//   setDoc,
// } from "firebase/firestore";

// export type BookDoc = {
//   id: string;            // stable id (google volume id)
//   title: string;
//   titleLower: string;
//   authors: string[];
//   authorsLower: string[];
//   genres: string[];
//   genresLower: string[];
//   description: string;
//   image: string;
//   createdAt?: any;
// };

// export function normalizeBook(raw: any): BookDoc | null {
//   const info = raw.volumeInfo ?? raw;

//   const googleId = raw.id ?? raw.googleId ?? null;
//   if (!googleId) return null;

//   const title = (info.title ?? "").trim();
//   if (!title) return null;

//   const authors: string[] = Array.isArray(info.authors) ? info.authors : [];
//   const genres: string[] =
//     Array.isArray(info.categories) ? info.categories : (Array.isArray(info.genres) ? info.genres : []);

//   const description = (info.description ?? "").slice(0, 1200);

//   const image =
//     info.imageLinks?.thumbnail ||
//     info.imageLinks?.smallThumbnail ||
//     info.image ||
//     "";

//   return {
//     id: googleId,
//     title,
//     titleLower: title.toLowerCase(),
//     authors,
//     authorsLower: authors.map((a) => a.toLowerCase()),
//     genres,
//     genresLower: genres.map((g) => g.toLowerCase()),
//     description,
//     image,
//     createdAt: serverTimestamp(),
//   };
// }

// export async function upsertBook(book: BookDoc) {
//   const ref = doc(db, "books", book.id);
//   const snap = await getDoc(ref);

//   // If exists, just keep it updated (safe)
//   await setDoc(
//     ref,
//     {
//       ...book,
//       // keep createdAt if exists
//       createdAt: snap.exists() ? snap.data().createdAt : book.createdAt,
//       updatedAt: serverTimestamp(),
//     },
//     { merge: true }
//   );

//   return book.id;
// }
