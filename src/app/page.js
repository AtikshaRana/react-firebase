"use client";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/DashBoard";
// import { AddStudent } from "./components/AddStudent";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";

// Define the routes properly
const myRouter = createBrowserRouter([
  {
    path: '', Component: DashBoard,children:[
      {path: '',Component:StudentList},
      {path: 'addStudent',Component:AddStudent},
      {path: 'studentList',Component:StudentList},
    ]
  },
  // Add more routes as needed
]);

export default function Home() {
  return <RouterProvider router={myRouter} />;
}
