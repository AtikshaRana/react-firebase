'use client'; // Ensure it runs in the browser

import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../../firebase';
import { useRouter } from 'next/navigation';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const router = useRouter(); // Next.js navigation

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!studentId || !name || !phone) {
      alert("All fields are required!");
      return;
    }

    try {
      const db = getDatabase(app);
      await set(ref(db, `students/${studentId}`), {
        studentName: name,
        phoneNumber: phone,
      });
      router.push('/studentList'); // Navigate correctly in Next.js
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="flex justify-center p-6 w-full">
      {/* Form Container */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-blue-800 mb-4">Add Student</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Student ID Input */}
          <input
            onChange={(e) => setStudentId(e.target.value)}
            type="number"
            placeholder="Student ID"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Student Name Input */}
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Student Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Phone Number Input */}
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
