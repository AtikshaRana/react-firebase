'use client';

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { app } from '../../../firebase';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [lastAddedStudent, setLastAddedStudent] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const studentsRef = ref(db, 'students');

    // Fetch students from Firebase
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase object into an array
        const studentList = Object.keys(data).map((key) => ({
          studentId: key,
          ...data[key],
        }));
        setStudents(studentList);
      }
    });

    // Retrieve last added student ID from sessionStorage
    const lastStudent = sessionStorage.getItem('lastAddedStudent');
    setLastAddedStudent(lastStudent);
  }, []);

  const handleDelete = (studentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (!confirmDelete) return;

    const db = getDatabase(app);
    const studentRef = ref(db, 'students/' + studentId);

    // Remove student from Firebase
    remove(studentRef)
      .then(() => {
        // After deletion, update the state to remove the student from the UI
        setStudents((prevStudents) => prevStudents.filter(student => student.studentId !== studentId));
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <section className="p-6 max-w-4xl mx-auto py-[20px] ">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Student List</h1>

      {lastAddedStudent && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-900 font-semibold text-center rounded-md">
          ✅ Last added student (ID: {lastAddedStudent}) is highlighted below!
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full rounded-lg">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <tr className="text-lg text-center">
              <th className="p-4">Student ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.studentId}
                className={`border-b transition-all duration-300 ${
                  student.studentId === lastAddedStudent
                    ? 'bg-yellow-200 font-semibold text-black'
                    : index % 2 === 0
                    ? 'bg-gray-100'
                    : 'bg-white'
                } hover:bg-gray-200 text-black text-center`}
              >
                <td className="p-4">{student.studentId}</td>
                <td className="p-4">{student.studentName}</td>
                <td className="p-4">{student.phoneNumber}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(student.studentId)}
                    className="mt-4 border-2 border-red-600 text-black hover:text-white py-1 px-2 rounded-md hover:bg-red-700 transition duration-300 w-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
