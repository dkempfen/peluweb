import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh7Z2xnbeDz7K8iZi7BHXVuqrUkdv3L3A",
  authDomain: "coderhouse-75ce0.firebaseapp.com",
  projectId: "coderhouse-75ce0",
  storageBucket: "coderhouse-75ce0.firebasestorage.app",
  messagingSenderId: "78972805843",
  appId: "1:78972805843:web:723542946112a01ae06a26"
};

//Inicializamos Firebase en nuestra App
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);