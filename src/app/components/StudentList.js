'use client';

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../../firebase';

export default function StudentList() {
  const [students, setStudents] = useState([]);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-blue-800 mb-4 text-center ">Student List</h1>

      {students.length === 0 ? (
        <p className="text-gray-500">No students found.</p>
      ) : (
        <div className="flex justify-center w-full">
        <div className="flex flex-wrap justify-center gap-8">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-[30%] "
            >
              <h2 className="text-xl font-bold text-gray-800">
                {student.studentName}
              </h2>
              <p className="text-gray-700 text-lg">ID: {student.id}</p>
              <p className="text-gray-700 text-lg">Phone: {student.phoneNumber}</p>
            </div>
          ))}
        </div>
      </div>
      
      
      
      )}
    </div>
  );
}
