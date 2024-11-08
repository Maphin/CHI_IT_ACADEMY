import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserStatus } from '../types/UserStatus';

interface IProtectedRouteProps {
    children: React.ReactNode;
    isAllowed: UserStatus;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, isAllowed }) => {
    if (isAllowed !== UserStatus.LOGGED_IN) {
        return <Navigate to='/login' replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;