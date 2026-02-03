
// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { syncUserReviews } from "@/lib/syncUserReviews";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [photoURL, setPhotoURL] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (status !== "authenticated") return;

//     const loadProfile = async () => {
//       const ref = doc(db, "users", session.user.id);
//       const snap = await getDoc(ref);

//       if (snap.exists()) {
//         setUsername(snap.data().username || "");
//         setPhotoURL(snap.data().photoURL || null);
//       }
//     };

//     loadProfile();
//   }, [status, session]);

//   const saveProfile = async () => {
//     if (!session?.user?.id) return;

//     try {
//       setSaving(true);

//       await setDoc(
//         doc(db, "users", session.user.id),
//         {
//           username,
//           photoURL,
//           updatedAt: serverTimestamp(),
//         },
//         { merge: true }
//       );

//       await syncUserReviews(session.user.id, username, photoURL);

//       router.push("/reviews");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (status === "loading") {
//     return <div className="text-center mt-20">Loading profile…</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>

//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         className="w-full border p-2 rounded mb-4"
//       />

//       {/* <input
//         value={photoURL ?? ""}
//         onChange={(e) => setPhotoURL(e.target.value)}
//         placeholder="Avatar image URL"
//         className="w-full border p-2 rounded mb-6"
//       /> */}

//       <button
//         onClick={saveProfile}
//         disabled={saving}
//         className="w-full bg-indigo-600 text-white py-2 rounded disabled:bg-gray-400"
//       >
//         {saving ? "Saving..." : "Save Changes"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { syncUserReviews } from "@/lib/syncUserReviews";
import { isUsernameAvailable } from "@/lib/isUsernameAvailable";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status !== "authenticated") return;

    const loadProfile = async () => {
      const refDoc = doc(db, "users", session.user.id);
      const snap = await getDoc(refDoc);

      if (snap.exists()) {
        setUsername(snap.data().username || "");
        setPhotoURL(snap.data().photoURL || null);
      }
    };

    loadProfile();
  }, [status, session]);

  const saveProfile = async () => {
    if (!session?.user?.id) return;

    setError("");
    setSaving(true);

    try {
      const available = await isUsernameAvailable(
        username,
        session.user.id
      );

      if (!available) {
        setError("Username already taken");
        setSaving(false);
        return;
      }

      let uploadedPhotoURL = photoURL;

      if (file) {
        const avatarRef = ref(
          storage,
          `avatars/${session.user.id}`
        );

        await uploadBytes(avatarRef, file);
        uploadedPhotoURL = await getDownloadURL(avatarRef);
      }

      await setDoc(
        doc(db, "users", session.user.id),
        {
          username,
          photoURL: uploadedPhotoURL,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await syncUserReviews(
        session.user.id,
        username,
        uploadedPhotoURL
      );

      router.push("/reviews");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center mt-20">Loading…</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Profile
      </h2>

      {error && (
        <p className="text-red-600 mb-4 text-center">
          {error}
        </p>
      )}

      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full border p-2 rounded mb-4"
      />

      <input
        type="file"
        accept="image/*"
        onChange={e =>
          setFile(e.target.files?.[0] || null)
        }
        className="w-full mb-4"
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