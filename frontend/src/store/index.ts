import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// 🔁 Types for useDispatch and useSelector

// This tells TS what the entire Redux state looks like
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;