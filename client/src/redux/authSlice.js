import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

// Async Thunks
export const loginAdmin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      return await authService.login(email, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('svs_admin_token');
      if (!token) return thunkAPI.rejectWithValue('No token found');
      return await authService.getProfile();
    } catch (error) {
      authService.logout(); // Clear bad token
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  admin: null,
  token: localStorage.getItem('svs_admin_token') || null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initialChecked: false, // Flag to prevent redirect flash on page reload
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      authService.logout();
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Admin
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
        state.initialChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
        state.initialChecked = true;
      });
  },
});

export const { logoutAdmin, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
