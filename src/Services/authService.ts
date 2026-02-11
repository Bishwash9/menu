import type { LoginResponse } from "../Types/auth";
import  { apiClient } from '../Config/api';

export const authService ={
    login: async(phone:string, password:string):
    Promise<LoginResponse> => {
        const data = await apiClient('/login/',{
            method : 'POST',
            body : JSON.stringify({phone,password})
        });

        //save tokens immediately after successful login
        if(data.tokens){
            localStorage.setItem('accessToken', data.tokens.accessToken);
            localStorage.setItem('refreshToken', data.tokens.refreshToken);
            localStorage.setItem('user', data.user.role); // Store user role for later use
        }

        return data;

        
    },

    logout: () => {
        localStorage.clear();
        window.location.href = '/login';
    }
}