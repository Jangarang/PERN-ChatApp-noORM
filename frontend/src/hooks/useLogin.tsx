import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { uiActions } from '../store/ui-slice';
import { NotificationStatusEnum } from '../types/enum';
import axiosInstance from '../utils/apis/apis';

const useLogin = () => {
    const dispatch = useDispatch();

    const login = async (username: string, password: string) => {
        // Why do I have this?
        dispatch(uiActions.showNotification({
                status: NotificationStatusEnum.Pending,
                title: 'Sending...',
                message: 'Sending cart data'
        })); 
        try{
            const loginResponse = await axiosInstance.post("/auth/login", {
                    username: username,
                    password: password
                },
                {
                    errorContext: 'Login'   
                }
            );
            const data = loginResponse.data;
            // TODO can make this reusable
            dispatch(authActions.setAuthuser({
                id: data.id,
                full_name: data.full_name,
                username: data.username,
                profile_pic: data.profile_pic,
                gender: data.gender,
            }));
            dispatch(authActions.setTokenExpiry(data.expiry));
            return true;
        } catch(error) {
            return false;
        }

    };
    return { login }
    
};

export default useLogin;