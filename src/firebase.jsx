// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiwQE2zEsAUo2--AkpmBPPdf8qtJvEeN8",
  authDomain: "glauth-2af72.firebaseapp.com",
  projectId: "glauth-2af72",
  storageBucket: "glauth-2af72.appspot.com",
  messagingSenderId: "115262366432",
  appId: "1:115262366432:web:25f57058bb613fcb8b2685",
  measurementId: "G-ZL8B7H7JFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app)
const provider = new GoogleAuthProvider()
export{app, auth, db, provider}

