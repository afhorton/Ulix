// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD38iZdVpSQXJ1cFcaucgC4yzlALb8il-I",
    authDomain: "final-react-blog-40aa4.firebaseapp.com",
    projectId: "final-react-blog-40aa4",
    storageBucket: "final-react-blog-40aa4.appspot.com",
    messagingSenderId: "921605442569",
    appId: "1:921605442569:web:c156a408b1dbe4f7477cd8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);
export default app;