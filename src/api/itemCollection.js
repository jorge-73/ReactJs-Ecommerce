// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIrW-Rw5QI__AiuJaBQtx_MUKoXS_nTQY",
  authDomain: "coderhouse-ecommerce-d6ff0.firebaseapp.com",
  projectId: "coderhouse-ecommerce-d6ff0",
  storageBucket: "coderhouse-ecommerce-d6ff0.appspot.com",
  messagingSenderId: "1049939788497",
  appId: "1:1049939788497:web:f98103acc6661e419d3bf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);