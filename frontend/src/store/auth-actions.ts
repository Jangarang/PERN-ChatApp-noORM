import type { AppDispatch } from './index';
import { isTokenExpired } from '../utils/helpers/tokenUtils';
import { authActions } from "./auth-slice";
import { store } from './index';

/** This is automatic logouts and checking on each request?*/
export const authThunk = () => {
    return async (dispatch:AppDispatch) => {
        const getAuthUser = async () => {
            const response = await fetch("/api/auth/me", {
                credentials: "include",
            });
            console.log('authThunk');
            if (!response.ok) {
                console.log('Token expired or user not authenticated'); 
                return;
            };

            const data = await response.json();
            console.log(data);
            return data;
        };

        try {

            dispatch(authActions.setAuthStatus('loading'));

            const authUser = await getAuthUser();
            console.log('[auth-actions.ts] authUser:', authUser);

            dispatch(authActions.setAuthuser({
                id: authUser.id,
                full_name: authUser.full_name,
                username: authUser.username,
                profile_pic: authUser.profile_pic,
                gender:authUser.gender,
            }));
            //Do I need separate reducer functions for these?
            dispatch(authActions.setTokenExpiry(authUser.expiry));
            dispatch(authActions.setAuthStatus('fulfilled'));

        }catch ( error ) {
            dispatch(authActions.setAuthStatus('failed'));
            console.log('silent error:',error);
            //throw new Error(`${error}`);
        };
    };    
};

export const checkTokenExpiryAndLogoutThunk = () => {
  return (dispatch: AppDispatch) => {
    const expired = store.getState().auth.tokenExpiry;
    console.log(`[Thunk] Time left: ${expired}ms`);
    if (isTokenExpired(expired)) {
      dispatch(authActions.logout());
    }
  };
};