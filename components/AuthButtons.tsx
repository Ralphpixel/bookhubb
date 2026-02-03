"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function AuthButtons() {
  return (
    <div className="space-y-3">
      <button
        onClick={() => signIn("google")}
        className="flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 hover:bg-gray-50"
      >
        <FaGoogle /> Continue with Google
      </button>

      <button
        onClick={() => signIn("github")}
        className="flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 hover:bg-gray-50"
      >
        <FaGithub /> Continue with GitHub
      </button>
    </div>
  );
}