import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../store';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const authUser = useSelector((state: RootState) => state.auth);

    if (authUser.authStatus === 'loading') {
        //'loading spinner or something here');
        // this causes another render RIGHT
        return <div>Loading...</div>; 
    }

    // if (!authUser.isAuthenticated) {
    if (authUser.authStatus === 'unauthenticated') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;