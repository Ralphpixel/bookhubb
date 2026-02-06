// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import {
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default function NotificationsPage() {
//   const { data: session } = useSession();
//   const [items, setItems] = useState<any[]>([]);

//   useEffect(() => {
//     if (!session?.user?.id) return;

//     const q = query(
//       collection(db, "notifications"),
//       where("userId", "==", session.user.id),
//       orderBy("createdAt", "desc")
//     );

//     const unsub = onSnapshot(q, snap => {
//       setItems(
//         snap.docs.map(d => ({
//           id: d.id,
//           ...d.data(),
//         }))
//       );
//     });

//     return () => unsub();
//   }, [session]);

//   return (
//     <div className="max-w-xl mx-auto mt-20">
//       <h1 className="text-2xl font-bold mb-6">Notifications</h1>

//       {items.map(n => (
//         <div key={n.id} className="bg-white p-3 mb-2 rounded shadow">
//           <strong>{n.fromUsername}</strong>{" "}
//           {n.type === "like" ? "liked" : "commented on"} your review
//         </div>
//       ))}
//     </div>
//   );
// }