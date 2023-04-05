import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDZ5LvwaDX3V3DmqO2UuBcy3WIKbCgw2vk",
  authDomain: "ecommere-209fa.firebaseapp.com",
  projectId: "ecommere-209fa",
  storageBucket: "ecommere-209fa.appspot.com",
  messagingSenderId: "605185101291",
  appId: "1:605185101291:web:2db84e25a660777aae5dae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;