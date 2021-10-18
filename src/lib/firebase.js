/******* FIREBASE ********/
/*************************/
/***** WEB VERSION 9 *****/
/*************************/
/*************************/

// import { seedDatabase } from "../seed";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjXcIK1Znvo2xOR1URZsV74c3knpup2K0",
  authDomain: "instagram-clonde-tuto.firebaseapp.com",
  projectId: "instagram-clonde-tuto",
  storageBucket: "instagram-clonde-tuto.appspot.com",
  messagingSenderId: "646708655898",
  appId: "1:646708655898:web:7ee74ef0340f2ea0595ea3",
  measurementId: "G-Z83V1HS0WH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

// seedDatabase(db);

export { app, analytics };
