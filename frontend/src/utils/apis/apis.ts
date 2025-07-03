import axios from 'axios';
// import {store} from '../../store/index';
// import { authActions } from '../../store/auth-slice';
// import { isTokenExpired } from '../helpers/tokenUtils';

const api = axios.create({
    baseURL: 'http://backend:5000',
    withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        // const expired = store.getState().auth.tokenExpiry;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // if(isTokenExpired(expired)) {
                //     store.dispatch(authActions.logout())
                // }
                generateToken();
                return api(originalRequest); 
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const generateToken = async () => {
    try {
        await api.get(`api/auth/generate-token`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error(error);
    }
}