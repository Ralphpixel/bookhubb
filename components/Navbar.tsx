import Link from "next/link";
import { getServerSession } from "next-auth";
import { FaBookOpen } from "react-icons/fa";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaBookOpen className="text-indigo-600 text-3xl" />
          <span>BookHub</span>
        </Link>

        {/* CLIENT NAV */}
        <NavbarClient session={session} />
        
      </nav>
    </header>
  );
}