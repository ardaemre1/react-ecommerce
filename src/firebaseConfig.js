// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEOGH_uKkAGJ33yT5UdhLE_aQfiHka84o",
  authDomain: "e-commerce-5c53e.firebaseapp.com",
  projectId: "e-commerce-5c53e",
  storageBucket: "e-commerce-5c53e.appspot.com",
  messagingSenderId: "875735709253",
  appId: "1:875735709253:web:c86ba707692520f8d0d52c",
  measurementId: "G-CQE9MCBDNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const analytics = getAnalytics(app);

export {auth,provider}