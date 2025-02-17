"use client";

import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when running in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server-side
  }

  // Define the routes properly
  const myRouter = createBrowserRouter([
    {
      path: '/',
      element: <DashBoard />,
      children: [
        { path: '', element: <StudentList /> },
        { path: 'addStudent', element: <AddStudent /> },
        { path: 'studentList', element: <StudentList /> },
      ],
    },
  ]);

  return <RouterProvider router={myRouter} />;
}
