import { initializeApp } from "firebase/app";

const fb = initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyBIB_P4mT53z--8tcwdXATkd6DoFG86VQw",
  authDomain: "batbook-dev.firebaseapp.com",
  projectId: "batbook-dev",
  storageBucket: "batbook-dev.appspot.com",
  messagingSenderId: "1066980752772",
  appId: "1:1066980752772:web:f6cc54112691248670f1d1",
});

export default fb;
