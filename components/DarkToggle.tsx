"use client";

export default function DarkToggle() {
  return (
    <button
      onClick={() =>
        document.documentElement.classList.toggle("dark")
      }
    >
      🌙
    </button>
  );
}