// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNwvQ6YLivTZpv6hk7PY0Tw0GCBBrNAaU",
    authDomain: "aceprep-e268d.firebaseapp.com",
    projectId: "aceprep-e268d",
    storageBucket: "aceprep-e268d.firebasestorage.app",
    messagingSenderId: "729277605893",
    appId: "1:729277605893:web:ebcf71b47eb535fb85d46c",
    measurementId: "G-CDC96PHETH"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);