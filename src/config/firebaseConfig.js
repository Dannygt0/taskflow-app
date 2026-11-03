
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Reemplaza con tus credenciales de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDummyKeyReplace_WITH_YOUR_API_KEY',
  authDomain: 'taskflow-app-replace.firebaseapp.com',
  projectId: 'taskflow-app-replace',
  storageBucket: 'taskflow-app-replace.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456789',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
