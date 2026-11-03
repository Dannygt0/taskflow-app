import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const TASKS_COLLECTION = 'tasks';

// Crear tarea en Firestore
export const createTask = async (userId, taskData) => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      ...taskData,
      userId,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...taskData, userId };
  } catch (error) {
    console.error('Error creando tarea:', error);
    throw error;
  }
};

// Obtener tareas del usuario
export const getUserTasks = async (userId) => {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return tasks;
  } catch (error) {
    console.error('Error obteniendo tareas:', error);
    throw error;
  }
};

// Listener en tiempo real para tareas
export const listenToUserTasks = (userId, callback) => {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(tasks);
    });
    return unsubscribe;
  } catch (error) {
    console.error('Error en listener:', error);
    throw error;
  }
};

// Actualizar tarea
export const updateTask = async (taskId, updates) => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, updates);
  } catch (error) {
    console.error('Error actualizando tarea:', error);
    throw error;
  }
};

// Eliminar tarea
export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
  } catch (error) {
    console.error('Error eliminando tarea:', error);
    throw error;
  }
};
