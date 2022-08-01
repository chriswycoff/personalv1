// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1PburXj2Fgp4TY8ee6NDtFIFALZD9RbA",
  authDomain: "devchrisapp.firebaseapp.com",
  projectId: "devchrisapp",
  storageBucket: "devchrisapp.appspot.com",
  messagingSenderId: "288428934442",
  appId: "1:288428934442:web:3268bea2f2922fc75d0a53",
  measurementId: "G-YR6E0M7KH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const authentication = getAuth()

const provider = new GoogleAuthProvider();

export {app, provider, analytics}