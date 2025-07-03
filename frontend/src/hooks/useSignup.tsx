import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import { NotificationStatusEnum } from '../types/enum';
import axiosInstance from '../utils/apis/apis';

type SignupInputs = {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
};

// interface CustomAxiosRequestConfig extends AxiosRequestConfig {
//   errorContext?: string;
// };

// const config: CustomAxiosRequestConfig = {
//   errorContext: 'sign-up'
// };

const useSignup = () => {
    const dispatch = useDispatch();

    const signup = async (inputs: SignupInputs) => {
     
            dispatch(uiActions.showNotification({
                status: NotificationStatusEnum.Pending,
                title: 'Sending...',
                message: 'Sending cart data'
            }));
            //Using fetch
            // const response = await fetch('/api/auth/signup', {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(inputs)
            // });

            //Using axios
            await axiosInstance.post("/auth/signup", inputs, 
                {errorContext: 'signup'}
            );
 
            dispatch(uiActions.showNotification({
              status: NotificationStatusEnum.Success,
              title: 'Success!',
              message: 'Sign Up Complete!',
            }));

    }
    return {signup};
}

export default useSignup;