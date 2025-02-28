"use client";

import { useState } from "react";
import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from "../../firebase";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        uid: user.uid,
      });

      console.log("User signed up:", user);
      router.push("/dashboard"); // Redirect after successful signup
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use. Try logging in instead.");
      } else {
        setError(error.message);
      }
      console.error("Signup Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignup} className="p-6 rounded shadow-md bg-white w-80">
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border p-2 mb-2 w-full" 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border p-2 mb-2 w-full" 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="border p-2 mb-2 w-full" 
          required 
        />
        <button 
          type="submit" 
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account? <a href="/login" className="text-blue-500 underline">Log in</a>
      </p>
    </div>
  );
};

export default Signup;
