"use client";

import { useState } from "react";

export default function BookSearchForm({
  onSearch,
}: {
  onSearch: (filters: {
    title: string;
    author: string;
    genre: string;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch({ title, author, genre });
      }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
    >
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border p-2 rounded"
      />

      <button className="bg-blue-600 text-white rounded px-4 py-2">
        Search
      </button>
    </form>
  );
}
