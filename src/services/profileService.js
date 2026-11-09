import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { db } from '../config/firebaseConfig';

const USERS_COLLECTION = 'users';
const AVATAR_SIZE = 256;

export const uploadAvatar = async (userId, localUri) => {
  const context = ImageManipulator.manipulate(localUri);
  context.resize({ width: AVATAR_SIZE });
  const rendered = await context.renderAsync();
  const { base64 } = await rendered.saveAsync({
    format: SaveFormat.JPEG,
    compress: 0.7,
    base64: true,
  });

  const avatarData = `data:image/jpeg;base64,${base64}`;
  await setDoc(doc(db, USERS_COLLECTION, userId), { avatarData }, { merge: true });
  return avatarData;
};

export const getAvatar = async (userId) => {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, userId));
  return snapshot.exists() ? snapshot.data().avatarData ?? null : null;
};
