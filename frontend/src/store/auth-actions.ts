import type { AppDispatch } from './index';
import { isTokenExpired } from '../utils/helpers/tokenUtils';
import { authActions } from "./auth-slice";
import { store } from './index';
import axiosInstance from '../utils/apis/apis';
// import axios from 'axios';

export const authGenerateAccessToken = () => {
    return async (dispatch:AppDispatch) => {
        try {
            const response = await axiosInstance.get("auth/generate-token", {
               errorContext: 'Refresh'
            });
            if (response) {
                const data = response.data;
                console.log('New access Token');
                dispatch(authActions.setTokenExpiry(data.expiry));
                return true;
            }
            console.log('response error: ', response);
            console.log('return false');
            return false;
        } catch ( err ) {
            console.error("[Thunk] Token refresh failed: ", err);
        }
    }
}

//TODO reformat fetch to axios
export const authThunk = () => {
    return async (dispatch:AppDispatch) => {
        const getAuthUser = async () => {
            const response = await fetch("/api/auth/me", {
                credentials: "include",
            });
        
            if (!response.ok) {
                console.log('Token expired or user not authenticated'); 
                return;
            };

            const data = await response.json();
            console.log(data);
            return data;
        };

        try {

            if (store.getState().auth.authStatus !== 'loading') {
                dispatch(authActions.setAuthStatus('loading'));
            }

            const authUser = await getAuthUser();
       

            dispatch(authActions.setAuthuser({
                id: authUser.id,
                full_name: authUser.full_name,
                username: authUser.username,
                profile_pic: authUser.profile_pic,
                gender:authUser.gender,
            }));
            //Do I need separate reducer functions for these?
            dispatch(authActions.setTokenExpiry(authUser.expiry));
            dispatch(authActions.setAuthStatus('authenticated'));

        }catch ( error ) {
            dispatch(authActions.setAuthStatus('unauthenticated'));
            console.log('silent error:',error);
            //throw new Error(`${error}`);
        };
    };    
};

export const checkTokenExpiryAndLogoutThunk = () => {
  
    return async (dispatch: AppDispatch) => {
    
    const expired = store.getState().auth.tokenExpiry;
    
    console.log(`[Thunk] Time left: ${expired}ms`);
    
    if (isTokenExpired(expired)) {
    
        console.log('[Thunk] token has expired');
        // dispatch(authActions.setAuthStatus('loading'));
        const success = await dispatch(authGenerateAccessToken());
    
        if (!success) {
            console.log('inner if statement');
            dispatch(authActions.logout());
        }   
    }
  };
};