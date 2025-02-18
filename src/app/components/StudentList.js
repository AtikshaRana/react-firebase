'use client';

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { app } from '../../firebase';
import { useRouter } from 'next/navigation';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const db = getDatabase(app);
    const studentsRef = ref(db, 'students');

    // Fetch student data
    onValue(studentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const studentsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setStudents(studentsArray);
      } else {
        setStudents([]);
      }
    });
  }, []);

  // Delete Student Function
  const deleteStudent = async (studentId) => {
    const db = getDatabase(app);
    const studentRef = ref(db, `students/${studentId}`);

    try {
      await remove(studentRef);
      setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Student List</h1>

      {students.length === 0 ? (
        <p className="text-gray-500 text-center">No students found.</p>
      ) : (
        <div className="flex justify-center w-full">
          <div className="flex flex-wrap justify-center gap-8">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-[30%] relative"
              >
                <h2 className="text-xl font-bold text-gray-800">{student.studentName}</h2>
                <p className="text-gray-700 text-lg">ID: {student.id}</p>
                <p className="text-gray-700 text-lg">Phone: {student.phoneNumber}</p>

                {/* Delete Button */}
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="mt-4 border-2 border-red-600 text-black hover:text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 w-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
