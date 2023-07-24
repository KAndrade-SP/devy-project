import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCllybWBtxKwQsEBmzqpQkfkW_C0ymlgb4",
  authDomain: "devy-project.firebaseapp.com",
  projectId: "devy-project",
  storageBucket: "devy-project.appspot.com",
  messagingSenderId: "292738799466",
  appId: "1:292738799466:web:3e8ad8bc6ce5f22afe7713"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);