

// "use client";

// import { useEffect, useState } from "react";
// import {
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import ReviewCard from "@/components/ReviewCard";

// type Review = {
//   id: string;
//   bookTitle: string;
//   content: string;
//   userId?: string;
//   username?: string;
//   userPhotoURL?: string;
//   likes?: number;
// };

// export default function ReviewsPage() {
//   const [reviews, setReviews] = useState<Review[]>([]);

//   useEffect(() => {
//     const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
//     const unsub = onSnapshot(q, (snap) => {
//       setReviews(
//         snap.docs.map((d) => ({ id: d.id, ...(d.data() as Review) }))
//       );
//     });

//     return () => unsub();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto mt-16">
//       <h1 className="text-3xl font-bold mb-8">Community Reviews</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {reviews.map((r) => (
//           <ReviewCard key={r.id} review={r} />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReviewCard from "@/components/ReviewCard";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, snap => {
      setReviews(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8">
        Community Reviews
      </h1>

      <div className="space-y-6">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}