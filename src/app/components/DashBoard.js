import React from 'react';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation */}
      <div className=" bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl w-[280px] ">
        <div className="p-6 text-center text-2xl font-semibold">Dashboard</div>
        <ul className="mt-10 space-y-4 px-6">
          {/* Add Student Link */}
          <Link
            className={`cursor-pointer py-2 px-4 rounded-md transition-all duration-200 block ${
              location.pathname === '/add-student' ? 'bg-blue-700' : 'hover:bg-blue-700'
            }`}
          >
            Add Students
          </Link>

          {/* Student List Link */}
          <Link
            className={`cursor-pointer py-2 px-4 rounded-md transition-all duration-200 block ${
              location.pathname === '/student-list' ? 'bg-blue-700' : 'hover:bg-blue-700'
            }`}
          >
            Student List
          </Link>
        </ul>
      </div>

      <div className="flex-grow bg-gray-50 p-6 w-[calc(100%-280px)]">
        <h1 className="text-4xl font-bold text-blue-800 text-center">Welcome to your Dashboard</h1>
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default DashBoard;
