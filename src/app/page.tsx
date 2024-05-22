'use client';
import { auth, googleProvider } from "../../utils/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default function Home() {
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Handle successful login here (e.g., navigate to a different page)
      console.log("User signed in successfully:", result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Handle errors here (e.g., display an error message)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 whitespace-nowrap">4000 weeks to do list</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleGoogleSignUp}
      >
        Sign In with Google
      </button>
    </main>
  );
}
