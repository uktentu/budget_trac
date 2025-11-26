import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeprBvgDbZpAkpJSkvQHwcjTG4TK1Xl7k",
    authDomain: "budget-trac-66f90.firebaseapp.com",
    projectId: "budget-trac-66f90",
    storageBucket: "budget-trac-66f90.firebasestorage.app",
    messagingSenderId: "843832704446",
    appId: "1:843832704446:web:8d45f92e7605796e9bcdef",
    measurementId: "G-533TL9DX8F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
