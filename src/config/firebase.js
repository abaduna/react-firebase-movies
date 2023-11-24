
import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCuT5Qth-u25mWINTKg_QGTLl965jKaGZ8",
  authDomain: "fir-react-fb7fd.firebaseapp.com",
  projectId: "fir-react-fb7fd",
  storageBucket: "fir-react-fb7fd.appspot.com",
  messagingSenderId: "955541589055",
  appId: "1:955541589055:web:3f02594e0ddccf83a03c8a",
  measurementId: "G-50F544JY0B"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app)
export const storage = getStorage(app)