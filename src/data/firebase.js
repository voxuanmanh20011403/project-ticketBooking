import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnCOgg_W-4AT8deJtcrCV8Solgy1UOsD4",
  authDomain: "datn-7ea87.firebaseapp.com",
  projectId: "datn-7ea87",
  storageBucket: "datn-7ea87.appspot.com",
  messagingSenderId: "1036495360122",
  appId: "1:1036495360122:web:f2fc6486a1d1eb680cabc3",
  measurementId: "G-ZCWEVJELJR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// const data = getDatabase(app)
export { db, auth, storage };
