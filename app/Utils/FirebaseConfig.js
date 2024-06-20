// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import GlobalApi from "./GlobalApi"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: GlobalApi.FIREBASE_API,
  authDomain: "ev-charging-app-7746c.firebaseapp.com",
  projectId: "ev-charging-app-7746c",
  storageBucket: "ev-charging-app-7746c.appspot.com",
  messagingSenderId: "612890930740",
  appId: "1:612890930740:web:4097d8efceda45ae29e461"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);