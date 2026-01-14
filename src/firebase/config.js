import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlZV6HLwh4tTDV9hb5JF13rPepWmnbYIU",
    authDomain: "family-nurse-68b2f.firebaseapp.com",
    projectId: "family-nurse-68b2f",
    storageBucket: "family-nurse-68b2f.firebasestorage.app",
    messagingSenderId: "948066319832",
    appId: "1:948066319832:web:3facec7ad50f44ea1306ad",
    measurementId: "G-CZPP1ZR0DY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);