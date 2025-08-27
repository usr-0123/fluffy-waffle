
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import config from "./firebase.config.json";

console.log(config)

const firebaseConfig = {
  apiKey: process.env.API_KEY || "",
  authDomain: process.env.AUTH_DOMAIN || "",
  databaseURL: process.env.DATABASE_URL || "",
  projectId: process.env.PROJECT_ID || "",
  storageBucket: process.env.STORAGE_BUCKET || "",
  messagingSenderId: process.env.MESSAGING_SENDER_ID || "",
  appId: process.env.APP_ID || "",
  measurementId: process.env.MEASUREMENT_ID || ""
};

console.log("Firebase config:",firebaseConfig);


// Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export default app;
