// "use client";

// import { useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "firebase-admin";
// import { Auth } from "firebase-admin/lib/auth/auth";


// export function useCurrentUser() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(Auth, (u) => {
//       setUser(u);
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   return { user, loading };
// }


