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
export const AuthStatus = {
    Idle: 'idle',
    Loading: 'loading',
    Fulfilled: 'fulfilled',
    Failed: 'failed'
} as const;

//HUH?
export type AuthStatus = typeof AuthStatus[keyof typeof AuthStatus];

interface AuthState {
    authUser: AuthUser | null;
    isAuthenticated: false | true;
    authStatus: AuthStatus;
    tokenExpiry: number,
};


const initialState: AuthState = {
    authUser: null,
    isAuthenticated: false, 
    authStatus: 'idle',
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
        setAuthStatus: (state, action: PayloadAction<AuthStatus>) =>{
            state.authStatus = action.payload;
        },
        logout: (state) => {
            state.authStatus = 'idle';
            state.authUser = null;
            state.tokenExpiry = 0;
            state.isAuthenticated = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;