"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function BookGrid() {
  const [query, setQuery] = useState("harry potter");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks(search = query) {
    setLoading(true);
    const res = await fetch(`/api/books?q=${search}`);
    const data = await res.json();
    setBooks(data.items || []);
    setLoading(false);
  }

  return (
    <>
      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchBooks()}
          placeholder="Search books..."
          className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* GRID */}
      {loading && <p className="text-center">Loading books...</p>}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}