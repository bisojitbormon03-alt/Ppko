import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKug1_H5gfrI1Jd1lMR9LoXCtIaOymsBk",
  authDomain: "my-life-cc185.firebaseapp.com",
  projectId: "my-life-cc185",
  storageBucket: "my-life-cc185.firebasestorage.app",
  messagingSenderId: "1020199293322",
  appId: "1:1020199293322:web:ee9e98f7753b2b45117873",
  measurementId: "G-K3M0BT1CBZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);