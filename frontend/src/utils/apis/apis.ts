import axios from 'axios';
import { store} from '../../store';
import { uiActions } from '../../store/ui-slice';
import { NotificationStatusEnum } from '../../types/enum';
// import {store} from '../../store/index';
// import { authActions } from '../../store/auth-slice';
// import { isTokenExpired } from '../helpers/tokenUtils';

const axiosInstance = axios.create({
    baseURL: '/api', //gets rewritten by vite
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('response: ',response)
        return response;
    },
    async function (error) {
        
        const status = error.response?.status;
        const originalRequest = error.config;
        
        const errorContext = error.config?.errorContext;
        const errorReason = error.response?.data.error;

        console.log('status',status)
 
        console.log(originalRequest);
        console.log(errorContext);
        console.log('Error Reason', errorReason);

        if (status === 403 && !originalRequest) {
            originalRequest._retry= true;
            try {
                generateToken();
                return axiosInstance(originalRequest);
            }catch(refreshError) {
                console.error("Token refresh failed: ", refreshError);
            }
        }
        else if (status >= 400) {
           store.dispatch(uiActions.showNotification({
                status: NotificationStatusEnum.Error,
                title: 'Error: ',
                message: `${errorContext} - ${errorReason}`,
           })) 
        }
      
        return Promise.reject(error);
    }
);

export const generateToken = async () => {
    try {
        await axiosInstance.get(`api/auth/generate-token`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error(error);
    }
};

export default axiosInstance;