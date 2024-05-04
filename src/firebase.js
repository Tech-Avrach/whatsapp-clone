import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you need analytics
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_AGRSOmgp9ntincd1gfmk5ve7fi-SNwk",
    authDomain: "whats-app-clone-925a7.firebaseapp.com",
    projectId: "whats-app-clone-925a7",
    storageBucket: "whats-app-clone-925a7.appspot.com",
    messagingSenderId: "489066479986",
    appId: "1:489066479986:web:5e65ec3fbbb6355de99deb",
    measurementId: "G-EPMQ6TJ3R9"
};

const googleProvider = new GoogleAuthProvider();

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp); // Uncomment if you need analytics
const db = getFirestore(firebaseApp); // Initialize Firestore
const auth = getAuth();
// const provider = new getAuth().GoogleAuthProvider(); // Use getAuth() for provider

export { auth, googleProvider};
export default db;