"use client";

export default function GenreFilter({ genres, setGenre }: any) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {genres.map((g: string) => (
        <button
          key={g}
          onClick={() => setGenre(g)}
          className="rounded-full border px-4 py-1 text-sm hover:bg-indigo-50"
        >
          {g}
        </button>
      ))}
    </div>
  );
}