// "use client";

// import { useState } from "react";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { useCurrentUser } from "@/components/useCurrentUser";
// import { useRouter } from "next/navigation";

// export default function AddReviewPage() {
//   const { user, loading } = useCurrentUser();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   if (loading) return <p className="text-center mt-20">Loading...</p>;

//   if (!user) {
//     return (
//       <p className="text-center mt-20 text-red-500">
//         You must be logged in to add a review.
//       </p>
//     );
//   }

//   const submitReview = async () => {
//     if (!title || !content) return;

//     setSubmitting(true);
//     setError("");

//     try {
//       await addDoc(collection(db, "reviews"), {
//         title,
//         content,
//         userId: user.uid,
//         createdAt: serverTimestamp(),
//       });

//       router.push("/reviews");
//     } catch (e) {
//       setError("Failed to submit review.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-16">
//       <input
//         className="w-full border rounded px-4 py-2 mb-4"
//         placeholder="Book title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         className="w-full border rounded px-4 py-2 mb-4"
//         placeholder="Write your review..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <button
//         onClick={submitReview}
//         disabled={submitting}
//         className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
//       >
//         {submitting ? "Submitting..." : "Submit Review"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddReviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("Anonymous");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadProfile = async () => {
      const ref = doc(db, "users", session.user.email!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUsername(snap.data().username || "Anonymous");
      }
    };

    loadProfile();
  }, [session]);

  const submitReview = async () => {
    if (!title || !content || !session?.user?.email) return;

    try {
      setLoading(true);

      await addDoc(collection(db, "reviews"), {
        bookTitle: title,
        content,
        userId: session.user.email,
        username,
        userPhotoURL: session.user.image || null,
        likes: 0,
        createdAt: serverTimestamp(),
      });

      router.push("/reviews");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="text-center mt-20 text-red-600">
        You must be logged in to add a review.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-8 rounded-xl shadow">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book title"
        className="w-full border p-2 rounded mb-4"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your review..."
        className="w-full border p-2 rounded mb-6"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="w-full py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}


