// import { NextResponse } from "next/server";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export async function POST(req: Request) {
//   const { query } = await req.json();

//   const res = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
//   );

//   const data = await res.json();

//   if (!data.items) {
//     return NextResponse.json({ inserted: 0 });
//   }

//   let inserted = 0;

//   for (const item of data.items) {
//     const info = item.volumeInfo;

//     await addDoc(collection(db, "books"), {
//       title: info.title ?? "Untitled",
//       authors: info.authors ?? ["Unknown"],
//       genres: info.categories ?? ["General"],
//       description: info.description ?? "",
//       thumbnail: info.imageLinks?.thumbnail ?? "",
//       googleId: item.id,
//       createdAt: serverTimestamp(),
//     });

//     inserted++;
//   }

//   return NextResponse.json({ inserted });
// }