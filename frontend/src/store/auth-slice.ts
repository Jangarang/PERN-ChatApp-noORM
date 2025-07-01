import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
    id: string,
    full_name: string, 
    username: string,
    profile_pic: string,
    gender:string
}

// interface DecodedJWT = {

// }

interface AuthState {
    authUser: AuthUser | null;
    isAuthenticated: false | true;
    // accessToken: string | null,
    tokenExpiry: number,
};

// Correctly typed initial state
const initialState: AuthState = {
    authUser: null,
    isAuthenticated: false,
    // accessToken: null,
    tokenExpiry: 0,
};

const authSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {        
        setAuthuser: (state, action: PayloadAction<AuthUser>) => {
            if (action.payload !== null) {
                state.authUser = action.payload;
                state.isAuthenticated = true;    
            }
        },
        setTokenExpiry: (state, action: PayloadAction<number>) => {
           state.tokenExpiry = action.payload; 
        },
        logout: (state) => {
            state.authUser = null;
            state.tokenExpiry = 0;
            state.isAuthenticated = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;