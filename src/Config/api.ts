import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.thefoodhubcafe.com.np/api/';

export const apiClient = async(endpoint: string, options: RequestInit = {}) =>{
    const token = localStorage.getItem('accessToken');



    const headers : Record<string, string> = {
        'Content-type' : 'application/json',
        ...(token && { 'Authorization' : `Bearer ${token}`}),
        ...((options.headers as Record<string, string>) || {}),
    };

    try{
        const response = await fetch(`${BASE_URL}${endpoint}`,{...options, headers});
    
        if(response.status === 401){
            localStorage.removeItem('accessToken');
            console.error('Session expired. Please log in again.');
            navigate('/login');
            return;
        }
    
        if(!response.ok){
            const error = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: error.message || 'API request failed',
            };
        } 
    
        return response.json();
        
    }catch(error:any){
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}   


//api.thefoodhubcafe.com.np/api/login 
