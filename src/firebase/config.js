import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdHBAfj08LABAoWzqBWctXHOKDXYt6TFM",
  authDomain: "identy-oficial.firebaseapp.com",
  projectId: "identy-oficial",
  storageBucket: "identy-oficial.appspot.com",
  messagingSenderId: "996444232841",
  appId: "1:996444232841:web:0008025366d35c8fc27a58",
  measurementId: "G-0X8L0SWNCP",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export {
  db,
  firebase,
}