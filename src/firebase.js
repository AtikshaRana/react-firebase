import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqP7GOtV8BjWpfMsBctsrsYNr_w9glgVM",
  authDomain: "fir-data-21fee.firebaseapp.com",
  projectId: "fir-data-21fee",
  storageBucket: "fir-data-21fee.firebasestorage.app",
  messagingSenderId: "759895508720",
  appId: "1:759895508720:web:eeed5fefaded4a61506435",
  measurementId: "G-VF3J3FZ007",
  databaseURL: "https://fir-data-21fee-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app , auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, doc, setDoc, getDoc };
