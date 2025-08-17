"use client";

import { auth, provider } from "@/lib/firebase"; // your firebase.ts
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // User info after login
      const user = result.user;
      console.log("Logged in user:", user);

      // Redirect to homepage or dashboard
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login / Signup</h1>
      <button
        onClick={handleGoogleSignIn}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Continue with Google
      </button>
    </div>
  );
}
