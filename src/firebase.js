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
  apiKey: "AIzaSyCHUxIEZCbOnmpstl3bwec7z8QS1pP__eI",
  authDomain: "vit-community-c2007.firebaseapp.com",
  projectId: "vit-community-c2007",
  storageBucket: "vit-community-c2007.appspot.com",
  messagingSenderId: "648284236512",
  appId: "1:648284236512:web:760fccd38fc566e5a6be85",
  measurementId: "G-LT8VKE15PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider= new GoogleAuthProvider();
export const db = getFirestore(app);

