// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWLIc17PUV_3RsFRcNtL1ln-EKBD_BR3E",
    authDomain: "ccnext-instagram.firebaseapp.com",
    projectId: "ccnext-instagram",
    storageBucket: "ccnext-instagram.appspot.com",
    messagingSenderId: "715685829712",
    appId: "1:715685829712:web:4ce209d4c8b703bc3f8555",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
