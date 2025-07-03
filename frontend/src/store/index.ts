import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import uiReducer from './ui-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});

// 🔁 Types for useDispatch and useSelector

// This tells TS what the entire Redux state looks like
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;