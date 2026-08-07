import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import propertyService from '../services/propertyService';

// Async Thunks
export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (params, thunkAPI) => {
    try {
      return await propertyService.getProperties(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPropertyDetails = createAsyncThunk(
  'properties/fetchDetails',
  async (slug, thunkAPI) => {
    try {
      return await propertyService.getPropertyBySlug(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNewProperty = createAsyncThunk(
  'properties/create',
  async (formData, thunkAPI) => {
    try {
      return await propertyService.createProperty(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProperty = createAsyncThunk(
  'properties/edit',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await propertyService.updateProperty(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProperty = createAsyncThunk(
  'properties/remove',
  async (id, thunkAPI) => {
    try {
      await propertyService.deleteProperty(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const togglePropertyFeaturedStatus = createAsyncThunk(
  'properties/toggleFeatured',
  async (id, thunkAPI) => {
    try {
      return await propertyService.toggleFeatured(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  properties: [],
  featuredProperties: [],
  selectedProperty: null,
  total: 0,
  pages: 0,
  currentPage: 1,
  loading: false,
  detailLoading: false,
  actionLoading: false,
  error: null,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearPropertyError: (state) => {
      state.error = null;
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Details
      .addCase(fetchPropertyDetails.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedProperty = action.payload.property;
      })
      .addCase(fetchPropertyDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })
      // Create Property
      .addCase(createNewProperty.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createNewProperty.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.properties.unshift(action.payload.property);
      })
      .addCase(createNewProperty.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // Edit Property
      .addCase(editProperty.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.properties.findIndex(p => p._id === action.payload.property._id);
        if (index !== -1) {
          state.properties[index] = action.payload.property;
        }
        if (state.selectedProperty?._id === action.payload.property._id) {
          state.selectedProperty = action.payload.property;
        }
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // Delete Property
      .addCase(removeProperty.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.properties = state.properties.filter(p => p._id !== action.payload);
      })
      .addCase(removeProperty.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // Toggle Featured
      .addCase(togglePropertyFeaturedStatus.fulfilled, (state, action) => {
        const index = state.properties.findIndex(p => p._id === action.payload.property._id);
        if (index !== -1) {
          state.properties[index].featured = action.payload.featured;
        }
      });
  },
});

export const { clearPropertyError, clearSelectedProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;
