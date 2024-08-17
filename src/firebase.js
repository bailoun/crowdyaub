// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUzN7rhX25dz5cGCQyQwjfKRwzvCKf_2Y",
  authDomain: "crowdy-aub.firebaseapp.com",
  projectId: "crowdy-aub",
  storageBucket: "crowdy-aub.appspot.com",
  messagingSenderId: "218351192069",
  appId: "1:218351192069:web:4f1b7916708c04a389b46c",
  measurementId: "G-WLM6SQDFXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
