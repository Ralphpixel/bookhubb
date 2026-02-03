import Link from "next/link";
import StarRating from "./StarRating";

export default function BookCard({ book }: { book: any }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      {book.thumbnail && (
        <img
          src={book.thumbnail}
          alt={book.title}
          className="rounded-lg mb-4 h-48 mx-auto"
        />
      )}

      <h3 className="font-semibold text-lg">{book.title}</h3>

      <p className="text-sm text-gray-500 mb-2">
        {book.authors?.join(", ")}
      </p>

      <StarRating value={book.rating || 0} />

      <Link
        href={`/books/${book.id}`}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View details
      </Link>
    </div>
  );
}