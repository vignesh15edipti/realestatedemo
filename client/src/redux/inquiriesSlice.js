import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import inquiryService from '../services/inquiryService';

// Async Thunks
export const fetchInquiries = createAsyncThunk(
  'inquiries/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await inquiryService.getInquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeInquiryStatus = createAsyncThunk(
  'inquiries/changeStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      return await inquiryService.updateInquiryStatus(id, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeInquiry = createAsyncThunk(
  'inquiries/remove',
  async (id, thunkAPI) => {
    try {
      await inquiryService.deleteInquiry(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  inquiries: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const inquiriesSlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    clearInquiryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Inquiries
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload.inquiries;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change Inquiry Status
      .addCase(changeInquiryStatus.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(changeInquiryStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.inquiries.findIndex(i => i._id === action.payload.inquiry._id);
        if (index !== -1) {
          state.inquiries[index] = action.payload.inquiry;
        }
      })
      .addCase(changeInquiryStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // Remove Inquiry
      .addCase(removeInquiry.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeInquiry.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.inquiries = state.inquiries.filter(i => i._id !== action.payload);
      })
      .addCase(removeInquiry.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInquiryError } = inquiriesSlice.actions;
export default inquiriesSlice.reducer;
