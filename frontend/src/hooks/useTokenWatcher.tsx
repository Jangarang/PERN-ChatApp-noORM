import { useEffect } from 'react';
import type { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { authThunk, checkTokenExpiryAndLogoutThunk } from '../store/auth-actions';
import type { RootState } from '../store';
import { tokenTimeLeft } from '../utils/helpers/tokenUtils';
// import { checkTokenExistsOnOpen } from '../utils/apis/apis';

const useTokenWatcher = (intervalMs = 30_00 ) => {

    const dispatch = useDispatch<AppDispatch>();
    const expired = useSelector((state: RootState) => state.auth.tokenExpiry);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const authStatus = useSelector((state:RootState) => state.auth.authStatus); 
    
    useEffect(()=> {
        console.log("Page Loaded");
        
        if (authStatus === 'loading') {
            dispatch(authThunk()); 
        };

    }, []);

    useEffect(()=> {
       if (!isAuthenticated || expired === 0 ) {
        console.log("[Hook] Waiting for auth to complete...");
        return;
       }
       console.log("[Hook] Auth Ready starting expiry checker")
        const interval = setInterval(() => {
            if (!isAuthenticated || expired === 0 ) {
                console.log('[Hook] Stopping interval - user logged out or expired removed');
                clearInterval(interval);
                return;
            }
            console.log('[Hook] Checking token expiry. Expiry in: ', tokenTimeLeft(expired));
            dispatch(checkTokenExpiryAndLogoutThunk());
        }, intervalMs)

        return () => clearInterval(interval);
    },[isAuthenticated, expired, intervalMs, dispatch])
};

export default useTokenWatcher;