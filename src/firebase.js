// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChPtu-u3jXC3R9fTq79EBeTGhcHFuTPmg",
  authDomain: "band-app-d266d.firebaseapp.com",
  projectId: "band-app-d266d",
  storageBucket: "band-app-d266d.appspot.com",
  messagingSenderId: "45948401509",
  appId: "1:45948401509:web:e823be122e75ed1cc0538c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);
