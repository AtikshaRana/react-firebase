// "use client"
// import React, { useState } from 'react';
// import { Link, useLocation, Outlet } from 'react-router-dom';
// import { AiOutlineUserAdd, AiOutlineUser, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
// import { useNavigate } from "react-router-dom";
// import { logout } from "../auth"

// const DashBoard = () => {
//   const location = useLocation(); 
//   const [isSidebarOpen, setSidebarOpen] = useState(true);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Side Navigation */}
//       <div
//         className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl ${
//           isSidebarOpen ? 'w-[280px]' : 'w-[80px]'
//         } transition-all duration-300 overflow-hidden`}
//       >
//         <div className="p-6 flex justify-between items-center">
//           <span className={`text-2xl font-semibold ${!isSidebarOpen && 'hidden'}`}>Dashboard</span>
//           <AiOutlineMenu
//             className="text-2xl cursor-pointer"
//             onClick={() => setSidebarOpen(!isSidebarOpen)}
//           />
//         </div>

//         <ul className="mt-6 space-y-4 px-6">
//           {/* Add Student Link */}
//           <Link
//             to="/add-student"
//             className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-md transition-all duration-200 ${
//               location.pathname === '/add-student' ? 'bg-blue-700' : 'hover:bg-blue-700'
//             }`}
//           >
//             <AiOutlineUserAdd className="text-xl" />
//             {isSidebarOpen && 'Add Students'}
//           </Link>

//           {/* Student List Link */}
//           <Link
//             to="/student-list"
//             className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-md transition-all duration-200 ${
//               location.pathname === '/student-list' ? 'bg-blue-700' : 'hover:bg-blue-700'
//             }`}
//           >
//             <AiOutlineUser className="text-xl" />
//             {isSidebarOpen && 'Student List'}
//           </Link>
//         </ul>

//         {/* Logout Button */}
//         <div className="absolute bottom-6 left-6">
//           <button className="flex items-center gap-3 bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200">
//             <AiOutlineLogout className="text-xl" />
//             {isSidebarOpen && 'Logout'}
//           </button>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-grow bg-gray-50 p-6">
//         <h1 className="text-4xl font-bold text-blue-800 text-center">Welcome to your Dashboard</h1>
//         <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
//         Logout
//         </button>
//         <Outlet /> {/* This will load the correct page content dynamically */}
//       </div>
//     </div>
//   );
// };

// export default DashBoard;
