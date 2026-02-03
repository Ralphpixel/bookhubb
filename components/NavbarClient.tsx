"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaBook } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Add Review", href: "/add-review" },
   { name: "Reviews", href: "/reviews" },
    { name: "Profile", href: "/profile" },
];

export default function NavbarClient() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b font-raleway">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            {/* MAIN LINKS */}
            <div className="flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition ${
                    pathname === link.href
                      ? "text-indigo-600"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {session && (
                <Link
                  href="/books"
                  className={`transition ${
                    pathname === "/books"
                      ? "text-indigo-600"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  Books
                </Link>
              )}
            </div>

            {/* AUTH SECTION — THIS IS WHERE THE GAP FIX IS */}
            <div className="flex items-center gap-4 pl-6 border-l">
              {!session ? (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-indigo-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700">
                    {session.user?.name}
                  </button>

                  {/* DROPDOWN */}
                  <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg border opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700"
            >
              {link.name}
            </Link>
          ))}

          {session && (
            <Link
              href="/books"
              onClick={() => setOpen(false)}
              className="block text-gray-700"
            >
              Books
            </Link>
          )}

          {!session ? (
            <>
              <Link href="/login" className="block text-gray-700">
                Login
              </Link>
              <Link
                href="/signup"
                className="block text-indigo-600 font-semibold"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className="block text-left text-gray-700"
            >
              Sign out
            </button>
          )}
        </div>
      )}
    </header>
  );
}