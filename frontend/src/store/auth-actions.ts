import type { RootState, AppDispatch } from './authStore';
import { authActions } from "./auth-slice";

export const authThunk = async () => {
    return async (dispatch:AppDispatch) => {
        const getAuthUser = async () => {
            const response = await fetch("/api/auth/me");
            
            if (!response.ok) {
                throw new Error('Could not fetch card data!');
            };

            const data = await response.json();

            return data;
        };

        try {
            const authUser = await getAuthUser();
            dispatch(authActions.setAuthuser({
                id: authUser.id,
                full_name: authUser.full_name,
                email: authUser.email,
                profile_pic: authUser.profile_pic,
                gender:authUser.gender,
            }))
        }catch ( error ) {
            throw new Error(`${error}`);
        };
    };    
};