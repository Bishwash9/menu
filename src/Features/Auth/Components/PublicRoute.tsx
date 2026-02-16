import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute =  () =>{
    //check if user is already logged in
    const token = localStorage.getItem('accessToken');

    if(token){
        return <Navigate to="/dashboard" replace />;
    }

    //if no token dont redirect them to dashbboard
    if(!token){
        return <Navigate to ="/login" replace />;
    }

    //if no token, allow them to view login page
    return <Outlet/>;
}