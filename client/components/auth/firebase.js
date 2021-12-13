import { initializeApp } from "firebase/app";
import config from "../../../config.js";

const fb = initializeApp({
  apiKey: "AIzaSyBIB_P4mT53z--8tcwdXATkd6DoFG86VQw",
  authDomain: "batbook-dev.firebaseapp.com",
  projectId: "batbook-dev",
  storageBucket: "batbook-dev.appspot.com",
  messagingSenderId: "1066980752772",
  appId: "1:1066980752772:web:f6cc54112691248670f1d1",
  measurementId: "G-E4TGQZXHXL",
});

export default fb;
