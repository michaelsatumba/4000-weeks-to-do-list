'use client';
import { useEffect } from 'react';
import { auth } from "../../../utils/firebaseConfig";
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
      } else {
        // No user is signed in.
        console.log("No user is signed in.");
        router.push('/');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

return (
  <div className="flex items-center justify-around py-2">
    <h1>Hello, Dashboard Page!</h1>
    <button
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  </div>

// flex box
// open list
// on hold list
// closed list
// done list
);
}