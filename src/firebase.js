// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVa5t91QOQcvv-_YZQ3EggV5VMwSCBok4",
  authDomain: "apex-stat-tracker-2fe10.firebaseapp.com",
  projectId: "apex-stat-tracker-2fe10",
  storageBucket: "apex-stat-tracker-2fe10.firebasestorage.app",
  messagingSenderId: "33105202571",
  appId: "1:33105202571:web:e76f893a6e5adc3938338e",
  measurementId: "G-6J5S7HL4NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const database = getDatabase(app);
