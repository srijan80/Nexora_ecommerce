// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC5kh5wCw9EckZs2KlJW6CtNLI97va4V6M",
  authDomain: "ecommmerre.firebaseapp.com",
  projectId: "ecommmerre",
  storageBucket: "ecommmerre.appspot.com", // fix: remove extra '.firebasestorage.app'
  messagingSenderId: "321275974752",
  appId: "1:321275974752:web:24e1e47018b392cd44df05"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
