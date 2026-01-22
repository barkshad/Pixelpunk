
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXDeieAsYlP0peIOMgy89VHT1Utzao0zE",
  authDomain: "pixelpunk-824a7.firebaseapp.com",
  projectId: "pixelpunk-824a7",
  storageBucket: "pixelpunk-824a7.firebasestorage.app",
  messagingSenderId: "767738253201",
  appId: "1:767738253201:web:5977c5587bc80cc5149430",
  measurementId: "G-5EVFPRT464"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
