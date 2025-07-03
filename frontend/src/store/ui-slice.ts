import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationType } from '../types/global';

interface UIState {
    notification: NotificationType | null,
};

const initialState: UIState = {
    notification: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<NotificationType>) => { 
            state.notification = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;