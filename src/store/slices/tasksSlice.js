import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: 'all', // 'all', 'completed', 'pending'
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        category: action.payload.category,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(newTask);
    },

    toggleTaskStatus: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
