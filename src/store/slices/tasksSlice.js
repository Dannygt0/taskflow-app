import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTask as firestoreCreateTask,
  updateTask as firestoreUpdateTask,
  deleteTask as firestoreDeleteTask,
  getUserTasks,
} from '../../services/taskService';

const initialState = {
  items: [],
  filter: 'all',
  isLoading: false,
  error: null,
};

// Async thunks para Firestore
export const addTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async ({ userId, taskData }) => {
    const newTask = await firestoreCreateTask(userId, taskData);
    return newTask;
  }
);

export const loadUserTasks = createAsyncThunk(
  'tasks/loadUserTasks',
  async (userId) => {
    const tasks = await getUserTasks(userId);
    return tasks;
  }
);

export const toggleTaskStatusAsync = createAsyncThunk(
  'tasks/toggleTaskStatus',
  async ({ taskId, currentStatus }) => {
    await firestoreUpdateTask(taskId, { completed: !currentStatus });
    return { taskId, completed: !currentStatus };
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId) => {
    await firestoreDeleteTask(taskId);
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setTasks: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // addTaskAsync
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // loadUserTasks
    builder
      .addCase(loadUserTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadUserTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // toggleTaskStatusAsync
    builder
      .addCase(toggleTaskStatusAsync.fulfilled, (state, action) => {
        const task = state.items.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.completed = action.payload.completed;
        }
      });

    // deleteTaskAsync
    builder
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setFilter, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
