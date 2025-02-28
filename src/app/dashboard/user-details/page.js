"use client";

import { useState, useEffect } from "react";
import { auth, db, getDoc, doc } from "../../../firebase";
import { useRouter } from "next/navigation";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  if (loading) return   <div className="flex justify-center">
  <div className="spinner-border animate-spin border-t-4 border-blue-800 w-12 h-12 rounded-full"></div>
</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {userDetails ? (
        <div>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>UID:</strong> {userDetails.uid}</p>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserDetails;
