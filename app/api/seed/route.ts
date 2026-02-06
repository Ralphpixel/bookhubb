// import { NextResponse } from "next/server";
// // import { normalizeBook, upsertBook } from "@/lib/bookStore";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const q = (body?.q ?? "").trim();

//     if (!q) {
//       return NextResponse.json({ ok: false, error: "Missing q" }, { status: 400 });
//     }

//     const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
//       q
//     )}&maxResults=20`;

//     const res = await fetch(url);
//     const data = await res.json();

//     const items = data.items ?? [];
//     let saved = 0;

//     for (const item of items) {
//       const normalized = normalizeBook(item);
//       if (!normalized) continue;
//       await upsertBook(normalized);
//       saved++;
//     }

//     return NextResponse.json({ ok: true, saved });
//   } catch (e: any) {
//     return NextResponse.json(
//       { ok: false, error: e?.message ?? "Unknown error" },
//       { status: 500 }
//     );
//   }
// }
