// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "agent-hire-3fe66.firebaseapp.com",
    projectId: "agent-hire-3fe66",
    storageBucket: "agent-hire-3fe66.firebasestorage.app",
    messagingSenderId: "386574765190",
    appId: "1:386574765190:web:4caec000e2eb12894e5507",
    measurementId: "G-W9838E5MDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider }