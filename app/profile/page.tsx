// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
// import { updateProfile } from "firebase/auth";
// import { db, auth } from "@/lib/firebase";
// import { useCurrentUser } from "@/components/useCurrentUser";

// export default function ProfilePage() {
//   const { user, loading } = useCurrentUser();

//   const [username, setUsername] = useState("");
//   const [savedUsername, setSavedUsername] = useState<string>("");
//   const [saving, setSaving] = useState(false);

//   const [toast, setToast] = useState<{ open: boolean; type: "success" | "error"; msg: string }>({
//     open: false,
//     type: "success",
//     msg: "",
//   });

//   const avatarSrc = useMemo(() => {
//     if (user?.image) return user.image;
//     return "/default-avatar.png"; // add any default image in /public
//   }, [user?.image]);

//   // Load current stored username (Firestore users collection)
//   useEffect(() => {
//     if (!user?.id) return;

//     const run = async () => {
//       try {
//         const ref = doc(db, "users", user.id);
//         const snap = await getDoc(ref);

//         const fromDb = snap.exists() ? (snap.data()?.username as string) : "";
//         const fromAuth = user?.name ?? "";

//         const finalName = fromDb || fromAuth || "";
//         setUsername(finalName);
//         setSavedUsername(finalName);
//       } catch (e) {
//         // don't block UI
//       }
//     };

//     run();
//   }, [user?.id, user?.name]);

//   const showToast = (type: "success" | "error", msg: string) => {
//     setToast({ open: true, type, msg });
//     window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 2200);
//   };

//   const handleSave = async () => {
//     if (!user) {
//       showToast("error", "You must be logged in.");
//       return;
//     }

//     const clean = username.trim();
//     if (!clean) {
//       showToast("error", "Username cannot be empty.");
//       return;
//     }

//     try {
//       setSaving(true);

//       // 1) Save in Firestore (works for both providers)
//       await setDoc(
//         doc(db, "users", user.id),
//         {
//           username: clean,
//           photoURL: user.image ?? null,
//           email: user.email ?? null,
//           updatedAt: serverTimestamp(),
//         },
//         { merge: true }
//       );

//       // 2) If Firebase user exists, also update Firebase Auth profile displayName
//       // This prevents future "User" fallback and keeps it consistent.
//       if (auth.currentUser) {
//         await updateProfile(auth.currentUser, { displayName: clean });
//       }

//       setSavedUsername(clean);
//       showToast("success", "Profile updated.");
//     } catch (e) {
//       showToast("error", "Failed to update profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center px-6">
//         <div className="text-center">
//           <p className="text-red-600 text-lg font-semibold">You must be logged in to view this page.</p>
//           <p className="text-gray-500 mt-2">Go to Login and sign in again.</p>
//         </div>
//       </div>
//     );
//   }

//   const changed = username.trim() !== (savedUsername || "").trim();

//   return (
//     <div className="min-h-[60vh] flex items-center justify-center px-6 py-10">
//       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left card */}
//         <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
//           <div className="flex flex-col items-center text-center">
//             <div className="relative h-24 w-24 rounded-full overflow-hidden border border-gray-200">
//               {/* If you still have next/image host issues, use <img> instead. */}
//               {/* Next/Image will work if your next.config allows the domain. */}
//               <Image src={avatarSrc} alt="Profile" fill className="object-cover" />
//             </div>

//             <h1 className="mt-4 text-2xl font-bold">Your Profile</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Logged in via <span className="font-semibold">{user.provider}</span>
//             </p>

//             <div className="w-full mt-6">
//               <label className="block text-left text-sm font-medium text-gray-700 mb-2">
//                 Username
//               </label>
//               <input
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter a username"
//                 className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />

//               <button
//                 onClick={handleSave}
//                 disabled={saving || !changed}
//                 className={`mt-5 w-full rounded-lg py-3 font-semibold transition ${
//                   saving || !changed
//                     ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 {saving ? (
//                   <span className="inline-flex items-center gap-3 justify-center">
//                     <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
//                     Saving...
//                   </span>
//                 ) : (
//                   "Save Changes"
//                 )}
//               </button>

//               <p className="text-xs text-gray-500 mt-3">
//                 This name will be used across reviews.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right side (keep your MyReviews component if you already had it) */}
//         <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
//           <h2 className="text-xl font-bold mb-4">My Reviews</h2>
//           <p className="text-gray-500 text-sm">
//             Keep your existing MyReviews section here.
//           </p>
//           {/* If you have <MyReviews /> already, replace this placeholder with it */}
//           {/* <MyReviews /> */}
//         </div>
//       </div>

//       {/* Toast */}
//       {toast.open && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
//           <div
//             className={`px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${
//               toast.type === "success" ? "bg-green-600" : "bg-red-600"
//             }`}
//           >
//             {toast.msg}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [saving, setSaving] = useState(false);

//   // ✅ LOAD PROFILE AFTER AUTH
//   useEffect(() => {
//     if (status !== "authenticated") return;

//     const loadProfile = async () => {
//       const ref = doc(db, "users", session.user.id);
//       const snap = await getDoc(ref);

//       if (snap.exists()) {
//         setUsername(snap.data().username || "");
//       }
//     };

//     loadProfile();
//   }, [status, session]);

//   // ✅ SAVE + REDIRECT
//   const saveProfile = async () => {
//     if (!username.trim()) return;

//     setSaving(true);

//     await setDoc(
//       doc(db, "users", session!.user.id),
//       {
//         username,
//         updatedAt: new Date(),
//       },
//       { merge: true }
//     );

//     setSaving(false);
//     router.push("/reviews");
//   };

//   // ⏳ AUTH STATES
//   if (status === "loading") {
//     return <div className="text-center mt-20">Loading profile...</div>;
//   }

//   if (!session) {
//     return (
//       <div className="text-center mt-20 text-red-500">
//         You must be logged in.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow">
//       <h1 className="text-2xl font-bold text-center mb-6">Your Profile</h1>

//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="w-full border rounded-md px-3 py-2 mb-4"
//         placeholder="Username"
//       />

//       <button
//         onClick={saveProfile}
//         disabled={saving}
//         className="w-full bg-indigo-600 text-white py-2 rounded-md disabled:opacity-60"
//       >
//         {saving ? "Saving..." : "Save & Continue"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
// import { db } from "@/lib/firebase";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // WAIT until auth is resolved
    if (status !== "authenticated") {
      if (status === "unauthenticated") {
        router.push("/login");
      }
      return;
    }

    const loadProfile = async () => {
      try {
        const ref = doc(db, "users", session.user.email!);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUsername(snap.data().username || "");
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [status, session, router]);

  const saveProfile = async () => {
    if (!session?.user?.email) return;

    try {
      setSaving(true);
      await setDoc(
        doc(db, "users", session.user.email),
        {
          username,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      router.push("/reviews");
    } catch (err) {
      console.error("Failed to save profile", err);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };


  if (status === "loading") {
    return <div className="text-center mt-20">Loading profile…</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={saveProfile}
        disabled={saving}
        className="w-full bg-indigo-600 text-white py-2 rounded disabled:bg-gray-400"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
