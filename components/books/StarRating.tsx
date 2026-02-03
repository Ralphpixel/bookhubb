export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex mt-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}