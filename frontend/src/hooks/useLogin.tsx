// import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';

const useLogin = () => {
    const dispatch = useDispatch();
   
    const login = async (username: string, password: string) => {
        const response = await fetch('/api/auth/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });

        if (!response.ok) {
            throw new Error('Could not fetch card data!');
        };

        const loginData = await response.json();
        console.log('loginData: ', loginData);

        dispatch(authActions.setAuthuser({
            id: loginData.id,
            full_name: loginData.full_name,
            username: loginData.username,
            profile_pic: loginData.profile_pic,
            gender: loginData.gender,
        }));

        dispatch(authActions.setTokenExpiry(loginData.expiry))
        return loginData;    
    };
    return { login }
    
};

export default useLogin;