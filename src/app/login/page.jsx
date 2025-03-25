"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from "../../firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showReset, setShowReset] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); 
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setResetMessage("Error sending reset email. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p className="mt-4 text-black">
          <button onClick={() => setShowReset(true)} className="text-blue-600">
            Forgot Password?
          </button>
        </p>

        {/* Password Reset Form */}
        {showReset && (
          <form onSubmit={handleForgotPassword} className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
              Reset Password
            </button>
            {resetMessage && <p className="text-green-600">{resetMessage}</p>}
          </form>
        )}

        <p className="mt-4 text-black">
          Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
