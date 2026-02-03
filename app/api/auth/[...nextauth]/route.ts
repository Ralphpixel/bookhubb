// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const ref = doc(db, "users", user.id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          await setDoc(ref, {
            username: user.name ?? "Anonymous",
            email: user.email,
            photoURL: user.image ?? null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }

        return true;
      } catch (err) {
        console.error("Sign-in error:", err);
        return false;
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    },
  },
});

export { handler as GET, handler as POST };