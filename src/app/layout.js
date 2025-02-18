'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Student Dashboard",
//   description: "Manage student records easily",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen bg-gray-100">
          {/* Side Navigation */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl w-[280px]">
            <div className="p-6 text-center text-2xl font-semibold">
              Dashboard
            </div>
            <ul className="mt-10 space-y-4 px-6">
              {/* Add Student Link */}
              <Link
                href="/add-student"
                className={`cursor-pointer py-2 px-4 rounded-md transition-all duration-200 block ${
                  pathname === "/add-student" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                Add Students
              </Link>

              {/* Student List Link */}
              <Link
                href="/student-list"
                className={`cursor-pointer py-2 px-4 rounded-md transition-all duration-200 block ${
                  pathname === "/student-list" ? "bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                Student List
              </Link>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-grow bg-gray-50 p-6 w-[calc(100%-280px)]">
            <h1 className="text-4xl font-bold text-blue-800 text-center pt-[100px] ">
              Welcome to your Dashboard
            </h1>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
