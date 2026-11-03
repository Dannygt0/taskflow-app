import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBJKnZVYpvjybfIOl9G46LKQIRIAArLFgk',
  authDomain: 'taskflow-app-718c3.firebaseapp.com',
  projectId: 'taskflow-app-718c3',
  storageBucket: 'taskflow-app-718c3.firebasestorage.app',
  messagingSenderId: '718520116872',
  appId: '1:718520116872:web:75cc14358e43468894613d',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);

export default app;
