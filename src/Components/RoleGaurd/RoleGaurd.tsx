import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext';
import {type Role } from '../../Lib/roles';

interface RoleGaurdProps{
    allowedRoles : Role[];
}

export const RoleGaurd = ({allowedRoles}: RoleGaurdProps) =>{
    const {role} = useAuth();

    //check token
    const token = localStorage.getItem('accessToken');

    if(!token){
        return <Navigate to = '/' replace />;
    }

    if(!allowedRoles.includes(role)){
        return <Navigate to = '/' replace />;
    }

    return <Outlet/>;
}