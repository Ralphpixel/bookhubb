// import { NextResponse } from "next/server";
// // import { adminDb } from "@/lib/firebaseAdmin";

// export async function GET() {
//   const snap = await adminDb.collection("books").get();

//   const authorsSet = new Set<string>();
//   const genresSet = new Set<string>();

//   snap.docs.forEach((doc) => {
//     const data = doc.data();

//     (data.authors || []).forEach((a: any) => a && authorsSet.add(String(a)));
//     (data.genres || []).forEach((g: any) => g && genresSet.add(String(g)));
//   });

//   const authors = Array.from(authorsSet).sort();
//   const genres = Array.from(genresSet).sort();

//   return NextResponse.json({ authors, genres });
// }