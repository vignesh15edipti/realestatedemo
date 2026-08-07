import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import propertiesReducer from './propertiesSlice';
import inquiriesReducer from './inquiriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertiesReducer,
    inquiries: inquiriesReducer,
  },
});
