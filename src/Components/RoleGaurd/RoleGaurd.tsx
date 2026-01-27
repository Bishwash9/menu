import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../Context/AuthContext';
import {type Role } from '../../Lib/Roles';

interface RoleGaurdProps{
    allowedRoles : Role[];
}

export const RoleGaurd = ({allowedRoles}: RoleGaurdProps) =>{
    const {role} = useAuth();

    if(!allowedRoles.includes(role)){
        return <Navigate to = '/'/>
    }

    return <Outlet/>;
}