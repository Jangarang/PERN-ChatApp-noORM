import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../store';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const authUser = useSelector((state: RootState) => state.auth.authUser);

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;