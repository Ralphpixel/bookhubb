"use client";

export default function Snackbar({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white shadow-lg
      ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      onClick={onClose}
    >
      {message}
    </div>
  );
}
