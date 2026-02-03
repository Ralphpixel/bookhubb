"use client";

import Link from "next/link";
import StarRating from "./StarRating";

export default function BookCard({ book }: any) {
  const info = book.volumeInfo;

  return (
    <Link
      href={`/books/${book.id}`}
      className="group rounded-2xl bg-white shadow hover:shadow-xl transition p-4"
    >
      <img
        src={info.imageLinks?.thumbnail || "/placeholder.png"}
        alt={info.title}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h3 className="mt-4 font-semibold text-lg group-hover:text-blue-600">
        {info.title}
      </h3>

      <p className="text-sm text-gray-500">
        {info.authors?.join(", ") || "Unknown Author"}
      </p>

      <StarRating rating={info.averageRating || 4} />
    </Link>
  );
}