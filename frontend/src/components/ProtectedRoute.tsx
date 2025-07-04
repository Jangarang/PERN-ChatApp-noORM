import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../store';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const authUser = useSelector((state: RootState) => state.auth);

    if (authUser.authStatus === 'idle' || authUser.authStatus === 'loading') {
        console.log('loading spinner or something here');
        // this causes another render RIGHT
        return <div>Loading...</div>; 
    }

    if (!authUser.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;