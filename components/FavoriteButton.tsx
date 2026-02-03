"use client";

import { useState } from "react";

export default function FavoriteButton({ id }: { id: string }) {
  const [fav, setFav] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem(id) === "true"
  );

  const toggle = () => {
    localStorage.setItem(id, String(!fav));
    setFav(!fav);
  };

  return (
    <button onClick={toggle} className="text-xl">
      {fav ? "❤️" : "🤍"}
      
    </button>
  );
}