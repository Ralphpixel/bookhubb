import { getServerSession } from "next-auth";
import Link from "next/link";

/* BOOK DATA */

const featuredBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    image: "/atomic-habit.jpg",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: "/rich dad poor dad.jpeg",
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: "/The Psychology of money.jpeg",
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    image: "/deep work.jpeg",
  },
  {
    id: 5,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    image: "/think and grow rich.png",
  },
];

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <main className="font-raleway w-full">

      {/*HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* IMAGE PLACEHOLDER */}
          <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/book.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Discover & Review <br />
              <span className="text-indigo-600">
                Your Next Favorite Book
              </span>
            </h1>

            <p className="text-gray-600 text-lg max-w-md">
              Explore books, read honest reviews, save your favorites,
              and build your personal reading library.
            </p>

            {!session ? (
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <Link
                href="/books"
                className="inline-block px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Go to Books
              </Link>
            )}
          </div>
        </div>
      </section>
      {/* WHY BOOKHUB  */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

      {/* LEFT TEXT */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">
          Why <span className="text-indigo-600">BookHub</span>?
        </h2>

        <p className="text-gray-600 text-lg max-w-lg">
          BookHub isn’t just a book list. It’s a personal reading
          ecosystem designed for readers who care about quality,
          clarity, and discovery.
        </p>

        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="text-indigo-600">✔</span>
            <span className="text-gray-700">
              Real reviews from real readers
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600">✔</span>
            <span className="text-gray-700">
              Save books and build your personal library
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600">✔</span>
            <span className="text-gray-700">
              Discover books by category, rating, and popularity
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600">✔</span>
            <span className="text-gray-700">
              Clean, distraction-free reading experience
            </span>
          </li>
        </ul>

        <div>
          <a
            href="/books"
            className="inline-block mt-4 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Explore Books
          </a>
        </div>
      </div>

      {/* RIGHT FEATURE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-gray-900 mb-2">
            Reviews & Ratings
          </h3>
          <p className="text-gray-600 text-sm">
            Read honest reviews and see real ratings before you commit.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-gray-900 mb-2">
            Save Favorites
          </h3>
          <p className="text-gray-600 text-sm">
            Keep track of books you love or plan to read later.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-gray-900 mb-2">
            Smart Discovery
          </h3>
          <p className="text-gray-600 text-sm">
            Find books by genre, popularity, and recommendations.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-gray-900 mb-2">
            Personal Library
          </h3>
          <p className="text-gray-600 text-sm">
            Your reading history, saved and organized in one place.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* FEATURED BOOKS CAROUSEL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Books
          </h2>

          {/* CAROUSEL */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="min-w-[200px] max-w-[200px] group cursor-pointer"
              >
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm">
                      {book.title}
                    </h3>
                    <p className="text-gray-300 text-xs">
                      {book.author}
                    </p>

                    <Link
                      href="/books"
                      className="mt-2 inline-block text-xs text-indigo-300 hover:underline"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/books"
              className="text-indigo-600 font-medium hover:underline"
            >
              Browse all books →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}