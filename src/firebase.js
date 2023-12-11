// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiyRRXdv6HyTiKI4Xa2c4tSWJQRfUf698",
  authDomain: "vit-community-c098d.firebaseapp.com",
  projectId: "vit-community-c098d",
  storageBucket: "vit-community-c098d.appspot.com",
  messagingSenderId: "333910249394",
  appId: "1:333910249394:web:1b66fb8af31629de981eab",
  measurementId: "G-W9BYJM8XZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider= new GoogleAuthProvider();
export const db = getFirestore(app);

