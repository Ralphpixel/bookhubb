// "use client";

// export default function Toast({ message, type }: { message: string; type: "success" | "error" }) {
//   return (
//     <div
//       className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg text-white shadow-lg
//       ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
//     >
//       {message}
//     </div>
//   );
// }
"use client";

import React, { useEffect } from "react";

type ToastProps = {
  open: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  durationMs?: number;
};

export default function Toast({
  open,
  message,
  type = "success",
  onClose,
  durationMs = 2500,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose(), durationMs);
    return () => clearTimeout(t);
  }, [open, durationMs, onClose]);

  if (!open) return null;

  const base =
    "fixed left-6 bottom-6 z-50 rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 text-white";
  const color =
    type === "success"
      ? "bg-emerald-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-slate-800";

  return (
    <div className={`${base} ${color}`}>
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 opacity-90 hover:opacity-100 text-white"
        aria-label="Close toast"
      >
        ✕
      </button>
    </div>
  );
}
