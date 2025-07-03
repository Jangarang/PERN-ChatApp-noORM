import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import { NotificationStatusEnum } from '../types/enum';

type SignupInputs = {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
};

const useSignup = () => {
    const dispatch = useDispatch();

    const signup = async (inputs: SignupInputs) => {
        try {
            dispatch(uiActions.showNotification({
                status: NotificationStatusEnum.Pending,
                title: 'Sending...',
                message: 'Sending cart data'
            }));

            const response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Could not fetch data!');
            }

            // const signupData = await response.json();

            dispatch(uiActions.showNotification({
              status: NotificationStatusEnum.Success,
              title: 'Success!',
              message: 'Sign Up Complete!',
            }));

        } catch (error: any) {
            dispatch(uiActions.showNotification({
                status: NotificationStatusEnum.Error,
                title: 'Error:',
                message: `Signing up - ${error.message || error.toString()}`,
            }));
        }
    }
    return {signup};
}

export default useSignup;