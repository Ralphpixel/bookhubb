import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
// import AuthButtons from "@/components/AuthButtons";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) redirect("/books");

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <div className="flex items-center justify-center px-10">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back to <span className="text-indigo-600">BookHub</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Sign in to continue discovering great books.
          </p>

          {/* <AuthButtons /> */}
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative hidden md:block">
        <Image
          src="/bookk.jpg"
          alt="Reading"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}