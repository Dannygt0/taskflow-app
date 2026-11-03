
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBJKnZVYpvjybfIOl9G46LKQIRIAArLFgk',
  authDomain: 'taskflow-app-718c3.firebaseapp.com',
  projectId: 'taskflow-app-718c3',
  storageBucket: 'taskflow-app-718c3.firebasestorage.app',
  messagingSenderId: '718520116872',
  appId: '1:718520116872:web:75cc14358e43468894613d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
