// // import { NextResponse } from "next/server";

// // export async function GET(req: Request) {
// //   const { searchParams } = new URL(req.url);
// //   const q = searchParams.get("q") || "harry potter";

// //   try {
// //     const res = await fetch(`
// //       https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}`
// //     );

// //     const data = await res.json();

// //     // 🔍 DEBUG LOG (IMPORTANT)
// //     console.log("GOOGLE BOOKS RESPONSE:", data);

// //     return NextResponse.json({
// //       items: data.items || [],
// //     });
// //   } catch (error) {
// //     console.error("BOOK API ERROR:", error);
// //     return NextResponse.json({ items: [] }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   getDocs,
//   limit,
//   orderBy,
//   query,
// } from "firebase/firestore";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const title = (searchParams.get("title") ?? "").trim().toLowerCase();
//     const author = (searchParams.get("author") ?? "").trim().toLowerCase();
//     const genre = (searchParams.get("genre") ?? "").trim().toLowerCase();

//     // Simple + reliable: get latest N books, then filter in memory
//     // (for small MVP; later we can add Firestore indexes + smarter queries)
//     const q = query(
//       collection(db, "books"),
//       orderBy("createdAt", "desc"),
//       limit(200)
//     );

//     const snap = await getDocs(q);

//     let books = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

//     // Filter in memory (works great for MVP)
//     if (author) {
//       books = books.filter((b: any) =>
//         Array.isArray(b.authorsLower) && b.authorsLower.includes(author)
//       );
//     }
//     if (genre) {
//       books = books.filter((b: any) =>
//         Array.isArray(b.genresLower) && b.genresLower.includes(genre)
//       );
//     }
//     if (title) {
//       books = books.filter((b: any) =>
//         (b.titleLower ?? "").includes(title)
//       );
//     }

//     // dropdown values
//     const authorsSet = new Set<string>();
//     const genresSet = new Set<string>();

//     for (const b of snap.docs.map((d) => d.data() as any)) {
//       (b.authors ?? []).forEach((a: string) => authorsSet.add(a));
//       (b.genres ?? []).forEach((g: string) => genresSet.add(g));
//     }

//     return NextResponse.json({
//       ok: true,
//       books,
//       authors: Array.from(authorsSet).sort(),
//       genres: Array.from(genresSet).sort(),
//     });
//   } catch (e: any) {
//     return NextResponse.json(
//       { ok: false, error: e?.message ?? "Unknown error" },
//       { status: 500 }
//     );
//   }
// }
