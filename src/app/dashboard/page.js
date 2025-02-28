"use client";

import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import StudentList from "../components/StudentList";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login after logout
  };

  if (loading) {
    return   <div className="flex justify-center">
    <div className="spinner-border animate-spin border-t-4 border-blue-800 w-12 h-12 rounded-full"></div>
  </div>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black px-6">
      <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
        {user && <p className="text-lg text-gray-700 mb-4">Logged in as: <span className="font-semibold">{user.email}</span></p>}
        
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-5 py-2 rounded-md transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Student List Section */}
      <div className="w-full max-w-[80%] mt-6">
        <StudentList />
      </div>
    </div>
  );
};

export default Dashboard;
