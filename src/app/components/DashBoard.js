import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation */}
      <div className="w-64 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl">
        <div className="p-6 text-center text-2xl font-semibold">Dashboard</div>
        <ul className="mt-10 space-y-4 px-6">
          <li className="cursor-pointer hover:bg-blue-700 py-2 px-4 rounded-md transition-all duration-200">Dashboard</li>
          <li className="cursor-pointer hover:bg-blue-700 py-2 px-4 rounded-md transition-all duration-200">
            <Link to='/addStudent'>Add Students</Link>
          </li>
          <li className="cursor-pointer hover:bg-blue-700 py-2 px-4 rounded-md transition-all duration-200">
           <Link to='/studentList'> Student list</Link>
          </li>
          <li className="cursor-pointer hover:bg-blue-700 py-2 px-4 rounded-md transition-all duration-200">Profile</li>
        </ul>
      </div>

      <div className="flex-grow bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-blue-800 text-center ">Welcome to your Dashboard</h1>
        <Outlet/>
        {/* <p className="mt-4 text-lg text-gray-700">
          Here, you can manage all your details, messages, settings, and more!
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-200 hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-800">Recent Activity</h2>
            <p className="mt-4 text-gray-600">View recent updates and activities here.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-200 hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-800">Messages</h2>
            <p className="mt-4 text-gray-600">Check your recent messages and notifications.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-200 hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-800">Settings</h2>
            <p className="mt-4 text-gray-600">Manage your account and other preferences.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashBoard;
