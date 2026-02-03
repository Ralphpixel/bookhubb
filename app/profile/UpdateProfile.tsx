// "use client";

// import { useEffect, useState } from "react";
// import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
// import { auth, db } from "@/lib/firebase";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   writeBatch,
// } from "firebase/firestore";
// import { useRouter } from "next/navigation";

// export default function UpdateProfilePage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [username, setUsername] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (u) => {
//       setUser(u);
//       setUsername(u?.displayName || "");
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   const handleSave = async () => {
//     if (!user) return;

//     if (!username.trim()) {
//       setError("Username cannot be empty.");
//       return;
//     }

//     setSaving(true);
//     setError("");

//     try {
//       // 1️⃣ Update Firebase Auth profile
//       await updateProfile(user, { displayName: username });

//       // 2️⃣ Update all reviews authored by user
//       const q = query(
//         collection(db, "reviews"),
//         where("userId", "==", user.uid)
//       );

//       const snap = await getDocs(q);
//       const batch = writeBatch(db);

//       snap.forEach((doc) => {
//         batch.update(doc.ref, { username });
//       });

//       await batch.commit();

//       router.push("/profile");
//     } catch (e) {
//       setError("Failed to update profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="text-center mt-24 text-red-600 text-lg">
//         You must be logged in to update your profile.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-8 text-center">
//       <h1 className="text-2xl font-semibold mb-6">Update Profile</h1>

//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500"
//         placeholder="Username"
//       />

//       {error && <p className="text-red-600 mb-3">{error}</p>}

//       <button
//         onClick={handleSave}
//         disabled={saving}
//         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
//       >
//         {saving ? "Saving..." : "Save Changes"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

export default function UpdateProfile() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Get logged-in Firebase user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(u);

      // 🔎 Load existing profile
      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUsername(snap.data().username || "");
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // 💾 Save profile
  const handleUpdate = async () => {
    if (!user || !username.trim()) return;

    setSaving(true);
    setError("");

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          username,
          email: user.email,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // ⏳ Loading state
  if (loading) {
    return <p className="text-center mt-20">Loading profile…</p>;
  }

  // 🚫 Not logged in
  if (!user) {
    return (
      <p className="text-center mt-20 text-red-500">
        You must be logged in to update your profile.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {error && (
        <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
      )}

      <button
        onClick={handleUpdate}
        disabled={saving}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {saving ? "Saving…" : "Update Profile"}
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        This name will appear on your reviews.
      </p>
    </div>
  );
}
