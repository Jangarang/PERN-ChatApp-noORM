import type { AppDispatch } from './index';
import { isTokenExpired } from '../utils/helpers/tokenUtils';
import { authActions } from "./auth-slice";
import { store } from './index';

/** This is automatic logouts and checking on each request?*/
export const authThunk = async () => {
    return async (dispatch:AppDispatch) => {
        const getAuthUser = async () => {
            const response = await fetch("/api/auth/me", {
                credentials: "include",
            });
            
            if (!response.ok) {
                throw new Error('Could not fetch card data!');
            };

            const data = await response.json();
            console.log(data);
            return data;
        };

        try {
            const authUser = await getAuthUser();
            console.log('authUser:', authUser);
            dispatch(authActions.setAuthuser({
                id: authUser.id,
                full_name: authUser.full_name,
                username: authUser.username,
                profile_pic: authUser.profile_pic,
                gender:authUser.gender,
            }))
        }catch ( error ) {
            throw new Error(`${error}`);
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