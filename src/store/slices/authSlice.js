import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadAvatar, getAvatarUrl } from '../../services/profileService';

export const uploadAvatarAsync = createAsyncThunk(
  'auth/uploadAvatar',
  async ({ userId, localUri }) => uploadAvatar(userId, localUri)
);

export const loadAvatarAsync = createAsyncThunk(
  'auth/loadAvatar',
  async (userId) => getAvatarUrl(userId)
);

const initialState = {
  user: null,
  avatarUri: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    setAvatarUri: (state, action) => {
      state.avatarUri = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.avatarUri = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadAvatarAsync.fulfilled, (state, action) => {
        state.avatarUri = action.payload;
      })
      .addCase(loadAvatarAsync.fulfilled, (state, action) => {
        state.avatarUri = action.payload;
      });
  },
});

export const { setUser, setLoading, setError, clearError, setAvatarUri, logout } = authSlice.actions;
export default authSlice.reducer;
