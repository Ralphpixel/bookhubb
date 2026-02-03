"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginClient() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-indigo-100 to-blue-50">

      {/* LEFT LOGIN CARD */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-[360px] space-y-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to BookHub
          </h1>

          <p className="text-gray-500">
            Sign in or create an account
          </p>

          <button
            onClick={() => signIn("google")}
            className="w-full border rounded-lg py-2 hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          <button
            onClick={() => signIn("github")}
            className="w-full border rounded-lg py-2 hover:bg-gray-50 transition"
          >
            Continue with GitHub
          </button>

          <button
            disabled
            className="w-full border rounded-lg py-2 opacity-40 cursor-not-allowed"
          >
            Continue with Apple
          </button>

          <button
            disabled
            className="w-full border rounded-lg py-2 opacity-40 cursor-not-allowed"
          >
            Continue with Email
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:flex items-center justify-center">
        <Image
          src="/bookk.jpg"
          alt="Reading illustration"
          width={420}
          height={420}
          className="rounded-2xl shadow-xl"
        />
      </div>

    </div>
  );
}