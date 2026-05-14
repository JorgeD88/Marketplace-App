import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArHYVX9FGFfxLoUiJKFEwGUEXqu2d0_-M",
  authDomain: "marketplace-app-45dcc.firebaseapp.com",
  projectId: "marketplace-app-45dcc",
  storageBucket: "marketplace-app-45dcc.firebasestorage.app",
  messagingSenderId: "517665396368",
  appId: "1:517665396368:web:cba3fb5202f9cfea2eaa15",
  measurementId: "G-Y3BV40ZZJT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
