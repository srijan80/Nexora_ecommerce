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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4">
  <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full flex flex-col items-center">
    <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
      Welcome
    </h1>
    
    <p className="text-gray-500 mb-6 text-center">
      Sign in or create an account to continue
    </p>

    <button
      onClick={handleGoogleSignIn}
      className="flex items-center cursor-pointer justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
    >
      <svg
        className="w-6 h-6 mr-3"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21.35 11.1H12v2.8h5.35C16.65 17.05 14.5 19 12 19c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.54 0 2.94.59 4 1.54l2.82-2.82C17.04 2.64 14.64 1.5 12 1.5 6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5c5.3 0 9.75-3.64 10.35-8.5z" />
      </svg>
      Continue with Google
    </button>

    <p className="mt-6 text-gray-400 text-sm text-center">
      By signing in, you agree to our <span className="text-blue-600">Terms</span> and <span className="text-blue-600">Privacy Policy</span>.
    </p>
  </div>
</div>

  );
}
