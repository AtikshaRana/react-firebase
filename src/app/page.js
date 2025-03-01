"use client";
import StudentList from "./components/StudentList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirect to login on homepage
  }, [router]);
  return (
    <div className="h-screen flex items-center justify-center">
      <p>Redirecting...</p>
      <StudentList />
    </div>
  );
}
