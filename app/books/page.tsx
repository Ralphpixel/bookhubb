// "use client";

// import { useState } from "react";
// import { books } from "@/lib/books";
// import BookCard from "@/components/BookCard";

// export default function BooksPage() {
//   const [query, setQuery] = useState("");
//   const [genre, setGenre] = useState("All");

//   const genres = ["All", ...new Set(books.map(b => b.genre))];

//   const filtered = books.filter(book => {
//     const matchesGenre = genre === "All" || book.genre === genre;
//     const matchesSearch =
//       book.title.toLowerCase().includes(query.toLowerCase()) ||
//       book.author.toLowerCase().includes(query.toLowerCase());
//     return matchesGenre && matchesSearch;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8">
//       {/* HEADER */}
//       <h1 className="text-3xl font-bold text-indigo-600 mb-6">
//         Discover Your Next Favorite Book
//       </h1>

//       {/* SEARCH + FILTER */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         <input
//           placeholder="Search books or authors..."
//           value={query}
//           onChange={e => setQuery(e.target.value)}
//           className="w-full md:w-1/2 rounded-md border px-4 py-2"
//         />

//         <select
//           value={genre}
//           onChange={e => setGenre(e.target.value)}
//           className="w-full md:w-1/4 rounded-md border px-4 py-2"
//         >
//           {genres.map(g => (
//             <option key={g}>{g}</option>
//           ))}
//         </select>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {filtered.map(book => (
//           <BookCard key={book.id} book={book} />
//         ))}
//       </div>
//     </div>
//   );
// // 

// "use client";

// import { useEffect, useMemo, useState } from "react";

// type Book = {
//   id: string;
//   title: string;
//   authors?: string[];
//   genres?: string[];
//   description?: string;
//   image?: string;
// };

// export default function BooksPage() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [genre, setGenre] = useState("");

//   const [books, setBooks] = useState<Book[]>([]);
//   const [authors, setAuthors] = useState<string[]>([]);
//   const [genres, setGenres] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const queryString = useMemo(() => {
//     const p = new URLSearchParams();
//     if (title.trim()) p.set("title", title.trim());
//     if (author) p.set("author", author);
//     if (genre) p.set("genre", genre);
//     return p.toString();
//   }, [title, author, genre]);

//   async function loadBooks() {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/books?${queryString}`);
//       const data = await res.json();

//       if (data.ok) {
//         setBooks(data.books ?? []);
//         setAuthors(data.authors ?? []);
//         setGenres(data.genres ?? []);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function importFromGoogle() {
//     const q = prompt("Search Google Books for what keyword? e.g. leadership, science, romance");
//     if (!q) return;

//     setLoading(true);
//     try {
//       const res = await fetch("/api/seed", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ q }),
//       });
//       const data = await res.json();
//       if (!data.ok) alert(data.error || "Import failed");
//       await loadBooks();
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadBooks();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <main className="max-w-6xl mx-auto px-6 py-10">
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-4xl font-bold">Book Library</h1>

//         <button
//           onClick={importFromGoogle}
//           className="rounded-lg px-4 py-2 border hover:bg-gray-50"
//         >
//           Import from Google
//         </button>
//       </div>

//       {/* 2-column hero */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//         {/* Left: Form */}
//         <div className="rounded-2xl border p-6 shadow-sm bg-white">
//           <p className="text-sm text-gray-600 mb-4">
//             Search books stored in Firebase. If you don’t have books yet, click{" "}
//             <b>Import from Google</b>.
//           </p>

//           <label className="text-sm font-medium">Title</label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g. Start With Why"
//             className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
//           />

//           <label className="text-sm font-medium">Author</label>
//           <select
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
//           >
//             <option value="">All authors</option>
//             {authors.map((a) => (
//               <option key={a} value={a.toLowerCase()}>
//                 {a}
//               </option>
//             ))}
//           </select>

//           <label className="text-sm font-medium">Genre</label>
//           <select
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2 mt-1 mb-6"
//           >
//             <option value="">All genres</option>
//             {genres.map((g) => (
//               <option key={g} value={g.toLowerCase()}>
//                 {g}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={loadBooks}
//             disabled={loading}
//             className="w-full rounded-lg bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading ? "Loading..." : "Search"}
//           </button>
//         </div>

//         {/* Right: Image panel */}
//         <div className="rounded-2xl border overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center">
//           <div className="p-10 text-center">
//             <div className="text-2xl font-semibold mb-2">Discover your next read</div>
//             <div className="text-gray-600">
//               Import books once, then your users can search them from Firebase.
//             </div>
//             <div className="mt-6 w-full max-w-sm mx-auto rounded-xl bg-white border p-6 text-left">
//               <div className="text-sm font-medium mb-2">Tip</div>
//               <div className="text-sm text-gray-600">
//                 Try importing: <b>leadership</b>, <b>romance</b>, <b>science</b>, <b>business</b>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results */}
//       {books.length === 0 ? (
//         <div className="text-gray-600">
//           No books found. Click <b>Import from Google</b> to populate your Firebase.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {books.map((b) => (
//             <div key={b.id} className="border rounded-2xl p-4 bg-white shadow-sm">
//               <div className="flex gap-4">
             
//                 <img
//                   src={b.image || "/bookk.jpg"}
//                   alt={b.title}
//                   className="w-20 h-28 object-cover rounded-lg border bg-gray-100"
//                 />
//                 <div className="min-w-0">
//                   <div className="font-semibold line-clamp-2">{b.title}</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     {(b.authors ?? []).join(", ") || "Unknown author"}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     {(b.genres ?? []).slice(0, 2).join(" • ") || "No genre"}
//                   </div>
//                 </div>
//               </div>

//               {b.description ? (
//                 <p className="text-sm text-gray-700 mt-4 line-clamp-3">
//                   {b.description}
//                 </p>
//               ) : null}
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import { searchBooks } from "@/lib/books";

export default function BooksPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("All authors");
  const [genre, setGenre] = useState("All genres");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchBooks({
        title,
        author,
        genre,
      });
      setBooks(results);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Book Library</h1>
      <p className="text-gray-500 mb-8">
        Search by title, author, or genre.
      </p>

      {/* SEARCH SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* FORM */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <label className="block mb-4">
            <span className="text-sm font-medium">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="Search for books"
            />
          </label>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <label>
              <span className="text-sm font-medium">Author</span>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              >
                <option>All authors</option>
               
              </select>
            </label>

            <label>
              <span className="text-sm font-medium">Genre</span>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              >
                <option>All genres</option>
                <option>Science</option>
                <option>Business</option>
                <option>Romance</option>
                <option>Technology</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* IMAGE*/}
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-center p-10">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Find your next favorite book
            </h2>
            <p className="text-gray-600">
              Browse books imported from Google Books.
            </p>
            <img
              src="bookk.jpg"
              alt="Books"
              className="mt-6 rounded-lg mx-auto max-h-56 object-cover"
            />
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <h2 className="text-xl font-semibold mb-4">
        Results ({books.length})
      </h2>

      {loading && <p>Loading…</p>}

      {!loading && books.length === 0 && (
        <p className="text-gray-500">No books found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={book.thumbnail}
              alt={book.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500">
                {book.authors?.join(", ")}
              </p>
              <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-1 rounded">
                {book.genre}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
