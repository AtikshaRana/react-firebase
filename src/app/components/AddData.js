"use client";
import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebase"; // Ensure this path is correct

const AddData = () => {
    const AddDemoData = (userId, name, phone) => {
        // Debugging logs
        console.log("UserId:", userId);
        console.log("Name:", name);
        console.log("Phone:", phone);

        // Ensure values are not undefined or null
        if (!userId || !name || !phone) {
            console.error("Error: One or more values are undefined or null");
            return; // Prevent Firebase from trying to save undefined data
        }

        const db = getDatabase(app);
        set(ref(db, "students/" + userId), {
            studentName: name,
            phone: phone
        })
        .then(() => {
            console.log("Data saved successfully!");
        })
        .catch((error) => {
            console.error("Failed to save data: ", error);
        });
    };

    return (
        <div>
            <h1>Add Data</h1>
            <button onClick={() => AddDemoData("31", "Atiksha Rana", "9539487")}>
                Add demo data
            </button>
        </div>
    );
};

export default AddData;
