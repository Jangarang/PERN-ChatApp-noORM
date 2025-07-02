import { useEffect } from 'react';
import type { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiryAndLogoutThunk } from '../store/auth-actions';
import type { RootState } from '../store';
import { tokenTimeLeft } from '../utils/helpers/tokenUtils';
const useTokenWatcher = (intervalMs = 30_00 ) => {
    const dispatch = useDispatch<AppDispatch>();
    const expired = useSelector((state: RootState) => state.auth.tokenExpiry);
    console.log('useTokenWatcher hook says hello');
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(()=> {
       if (!isAuthenticated || expired === 0) {
        console.log("[Hook] Not authenticated or no token expiry set.");
        return;
       }
        const interval = setInterval(() => {
            console.log('[Hook] Checking token expiry. Expiry in: ', tokenTimeLeft(expired));
            dispatch(checkTokenExpiryAndLogoutThunk());
        }, intervalMs)

        return () => clearInterval(interval);
    },[isAuthenticated, expired, intervalMs, dispatch])
};

export default useTokenWatcher;