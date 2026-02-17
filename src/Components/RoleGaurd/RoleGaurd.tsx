import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext';
import {type Role } from '../../Lib/roles';

interface RoleGaurdProps {
    allowedRoles: Role[];
}

export const RoleGaurd = ({ allowedRoles }: RoleGaurdProps) => {
    const { role } = useAuth();

    //check token
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to='/' replace />;
    }

    if (!allowedRoles.includes(role)) {
        // If logged in but role is wrong, stay on dashboard/safe page
        // Redirecting to '/' causes a loop because PublicRoute sends them back here
        return <Navigate to='/dashboard' replace />;
    }

    return <Outlet />;
}