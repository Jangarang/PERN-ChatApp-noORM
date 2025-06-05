import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
    id: string,
    full_name: string,
    email: string,
    profile_pic: string,
    gender:string
}

interface AuthState {
    authUser: AuthUser | null;
    isAuthenticated: false;
};

// Correctly typed initial state
const initialState: AuthState = {
  authUser: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setAuthuser: (state, action: PayloadAction<AuthUser>) => {
            if (action.payload !== null) {
                state.authUser = action.payload;
            }
            
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;