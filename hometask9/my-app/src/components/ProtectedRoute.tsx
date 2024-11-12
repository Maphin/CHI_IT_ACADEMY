import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserStatus } from '../types/UserStatus';
import { AccessType } from '../types/AccessType';

interface IProtectedRouteProps {
    children: React.ReactNode;
    userStatus: UserStatus;
    access: AccessType;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, userStatus, access }) => {
    if (access === 'loggedOutOnly' && userStatus !== UserStatus.LOGGED_OUT) {
        return <Navigate to='/' replace />;
    }

    if (access === 'loggedInOnly' && userStatus !== UserStatus.LOGGED_IN) {
        return <Navigate to='/login' replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;