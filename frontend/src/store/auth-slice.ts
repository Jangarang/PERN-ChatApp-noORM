import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
    id: string,
    full_name: string, 
    username: string,
    profile_pic: string,
    gender:string
}

export const AuthStatus = {
    Unauthenticated: 'unauthenticated',
    Loading: 'loading',
    Authenticated: 'authenticated',
} as const;

//HUH?
export type AuthStatus = typeof AuthStatus[keyof typeof AuthStatus];

interface AuthState {
    authUser: AuthUser | null;
    authStatus: AuthStatus;
    tokenExpiry: number,
};


const initialState: AuthState = {
    authUser: null,
    authStatus: 'loading',
    tokenExpiry: 0,
};

const authSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {        
        setAuthuser: (state, action: PayloadAction<AuthUser>) => {
            if (action.payload !== null) {
                state.authUser = action.payload;
                state.authStatus = 'authenticated'; 
            }
        },
        setTokenExpiry: (state, action: PayloadAction<number>) => {
           state.tokenExpiry = action.payload; 
        },
        setAuthStatus: (state, action: PayloadAction<AuthStatus>) =>{
            state.authStatus = action.payload;
        },
        logout: (state) => {
            state.authStatus = 'unauthenticated';
            state.authUser = null;
            state.tokenExpiry = 0;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;