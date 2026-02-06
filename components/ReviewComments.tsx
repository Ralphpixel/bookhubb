// "use client";

// import { useEffect, useState } from "react";
// import {
//   addDoc,
//   collection,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// // import { db } from "@/lib/firebase";
// import { useSession } from "next-auth/react";
// import { db } from "../lib/firebase";

// export default function ReviewComments({ reviewId }: { reviewId: string }) {
//   const { data: session } = useSession();
//   const [comments, setComments] = useState<any[]>([]);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     const ref = collection(db, "reviews", reviewId, "comments");

//     const unsub = onSnapshot(ref, (snap) => {
//       setComments(
//         snap.docs.map((d) => ({ id: d.id, ...d.data() }))
//       );
//     });

//     return () => unsub();
//   }, [reviewId]);

//   async function submit() {
//     if (!text.trim()) return;

//     await addDoc(
//       collection(db, "reviews", reviewId, "comments"),
//       {
//         text,
//         user: session?.user?.name || "Anonymous",
//         createdAt: serverTimestamp(),
//       }
//     );

//     setText("");
//   }

//   return (
//     <div className="mt-4 space-y-2">
//       {comments.map((c) => (
//         <p key={c.id} className="text-sm text-gray-600">
//           <b>{c.user}:</b> {c.text}
//         </p>
//       ))}

//       {session && (
//         <div className="flex gap-2 mt-2">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="flex-1 border rounded px-2 py-1 text-sm"
//             placeholder="Add comment..."
//           />
//           <button
//             onClick={submit}
//             className="text-sm text-blue-600"
//           >
//             Post
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
