"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AiOutlineUserAdd, AiOutlineUser, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";

const DashboardLayout = ({ children }) => {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const router = useRouter();

    const handleLogout = () => {
        router.push("/login"); // Redirect to login on logout
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl ${isSidebarOpen ? "w-[280px]" : "w-[80px]"} transition-all duration-300 overflow-hidden`}>
                <div className="p-6 flex justify-between items-center">
                    {/* 🔹 Clickable Dashboard Title */}
                    <span
                        className={`text-2xl font-semibold cursor-pointer ${!isSidebarOpen && "hidden"}`}
                        onClick={() => router.push("/dashboard")}
                    >
                        Dashboard
                    </span>
                    <AiOutlineMenu className="text-2xl cursor-pointer" onClick={() => setSidebarOpen(!isSidebarOpen)} />
                </div>

                <ul className="mt-6 space-y-4 px-6">
                    {/* Add Student */}
                    <button
                        onClick={() => router.push("/dashboard/add-student")}
                        className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-md transition-all duration-200 ${pathname === "/dashboard/add-student" ? "bg-blue-700" : "hover:bg-blue-700"
                            }`}
                    >
                        <AiOutlineUserAdd className="text-xl" />
                        {isSidebarOpen && "Add Students"}
                    </button>

                    {/* Student List */}
                    <button
                        onClick={() => router.push("/dashboard/student-list")}
                        className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-md transition-all duration-200 ${pathname === "/dashboard/student-list" ? "bg-blue-700" : "hover:bg-blue-700"
                            }`}
                    >
                        <AiOutlineUser className="text-xl" />
                        {isSidebarOpen && "Student List"}
                    </button>

                    {/* 🔹 New User Details Option */}
                    <button
                        onClick={() => router.push("/dashboard/user-details")}
                        className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-md transition-all duration-200 ${pathname === "/dashboard/user-details" ? "bg-blue-700" : "hover:bg-blue-700"
                            }`}
                    >
                        <AiOutlineUser className="text-xl" />
                        {isSidebarOpen && "User Details"}
                    </button>

                </ul>

                {/* Logout */}
                <div className="absolute bottom-6 left-6">
                    <button onClick={handleLogout} className="flex items-center gap-3 bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200">
                        <AiOutlineLogout className="text-xl" />
                        {isSidebarOpen && "Logout"}
                    </button>
                </div>
            </div>

            {/* Page Content */}
            <div className="flex-grow bg-gray-50 p-6">{children}</div>
        </div>
    );
};

export default DashboardLayout;
