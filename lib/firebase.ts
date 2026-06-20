
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPj5ogrN_l0rF0T6ryZ4TfWLFhdR-Wia4",
  authDomain: "test-project-d805a.firebaseapp.com",
  databaseURL: "https://test-project-d805a-default-rtdb.firebaseio.com",
  projectId: "test-project-d805a",
  storageBucket: "test-project-d805a.firebasestorage.app",
  messagingSenderId: "96174887363",
  appId: "1:96174887363:web:e7c2c095c5e272aebe2d76",
  measurementId: "G-TFR76DMWRN"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);