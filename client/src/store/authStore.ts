import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// 🔁 Types for useDispatch and useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;