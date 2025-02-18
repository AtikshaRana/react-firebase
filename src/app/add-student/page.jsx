'use client';

import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../../firebase';
import { useRouter } from 'next/navigation';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!studentId || !name || !phone) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    try {
      const db = getDatabase(app);
      await set(ref(db, `students/${studentId}`), {
        studentId,
        studentName: name,
        phoneNumber: phone,
      });

      // Save last added student ID in sessionStorage
      sessionStorage.setItem('lastAddedStudent', studentId);

      // Clear form fields
      setStudentId('');
      setName('');
      setPhone('');

      setSuccessMessage('Student details have been added successfully!');

      // Redirect after 3 seconds
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('');
        router.push('/student-list');
      }, 3000);
    } catch (error) {
      console.error('Error saving student:', error);
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center p-6 w-full py-[20px]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-blue-800 mb-4">Add Student</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            onChange={(e) => setStudentId(e.target.value)}
            value={studentId}
            type="number"
            placeholder="Student ID"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Student Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="number"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {loading && (
          <div className="flex justify-center mt-4">
            <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-blue-600 border-gray-200 rounded-full"></div>
          </div>
        )}

        {successMessage && (
          <div className="mt-4 text-green-600 font-semibold text-center">
            {successMessage}
          </div>
        )}
      </div>
    </section>
  );
}
