import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebaseConfig';

const USERS_COLLECTION = 'users';

export const uploadAvatar = async (userId, localUri) => {
  const response = await fetch(localUri);
  const blob = await response.blob();

  const avatarRef = ref(storage, `avatars/${userId}.jpg`);
  await uploadBytes(avatarRef, blob, { contentType: 'image/jpeg' });
  const avatarUrl = await getDownloadURL(avatarRef);

  await setDoc(doc(db, USERS_COLLECTION, userId), { avatarUrl }, { merge: true });
  return avatarUrl;
};

export const getAvatarUrl = async (userId) => {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, userId));
  return snapshot.exists() ? snapshot.data().avatarUrl ?? null : null;
};
