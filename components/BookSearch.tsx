// "use client";

// import { useState } from "react";
// import { Book } from "@/data/books";
// import BookCard from "./BookCard";

// export default function BookSearch({ books }: { books: Book[] }) {
//   const [query, setQuery] = useState("");
//   const [genre, setGenre] = useState("All");

//   const genres = ["All", ...new Set(books.map((b) => b.genre))];

//   const filtered = books.filter((b) => {
//     const matchesQuery =
//       b.title.toLowerCase().includes(query.toLowerCase()) ||
//       b.author.toLowerCase().includes(query.toLowerCase());

//     const matchesGenre = genre === "All" || b.genre === genre;

//     return matchesQuery && matchesGenre;
//   });

//   return (
//     <>
//       <div className="flex gap-4 mb-4">
//         <input
//           placeholder="Search books..."
//           className="border p-2 rounded w-full"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />

//         <select
//           className="border p-2 rounded"
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
//         >
//           {genres.map((g) => (
//             <option key={g}>{g}</option>
//           ))}
//         </select>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {filtered.map((book) => (
//           <BookCard key={book.id} book={book} />
//         ))}
//       </div>
//     </>
//   );
// }