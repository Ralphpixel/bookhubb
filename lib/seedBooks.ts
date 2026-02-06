// import { collection, addDoc } from "firebase/firestore";
// import { db } from "./firebase";
// // import { fetchGoogleBooks } from "./googleBooks";

// export async function seedBooks() {
//   const books = await fetchGoogleBooks("leadership");

//   for (const book of books) {
//     await addDoc(collection(db, "books"), {
//       ...book,
//       createdAt: new Date(),
//     });
//   }

//   console.log("Books seeded");
// }
