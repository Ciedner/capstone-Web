import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCDuoGHrM9DLaWmtGeVn2BnBsC1BOLGGCo",
  authDomain: "spotwise-e1514.firebaseapp.com",
  projectId: "spotwise-e1514",
  storageBucket: "spotwise-e1514.appspot.com",
  messagingSenderId: "363637535625",
  appId: "1:363637535625:web:7827a5835ad7ff655de758",
  measurementId: "G-MEWCKKY1F0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;