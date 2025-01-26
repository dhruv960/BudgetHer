
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { signOut,getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGvFHltJnfsYmxnrKxiblRdxHL_WJxxxE",
  authDomain: "dhruv-jain.firebaseapp.com",
  projectId: "dhruv-jain",
  storageBucket: "dhruv-jain.firebasestorage.app",
  messagingSenderId: "701630266306",
  appId: "1:701630266306:web:d0bbc71173d5cb3ac1345b",
  measurementId: "G-QJM2YZN1ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export {signInWithEmailAndPassword};
export{createUserWithEmailAndPassword};
export{signOut};
export const db = getFirestore(app);
