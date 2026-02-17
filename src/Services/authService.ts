import type { LoginResponse } from "../Types/auth";
import { apiClient } from '../Config/api';

export const authService = {
    login: async (phone_number: string, password: string):
        Promise<LoginResponse> => {

        const data = await apiClient('login/', {
            method: 'POST',
            body: JSON.stringify({ phone_number, password })
        });

        //save tokens immediately after successful login
        if (data.tokens) {
            localStorage.setItem('accessToken', data.tokens.access);
            localStorage.setItem('refreshToken', data.tokens.refresh);
        }
        if (data.businesses && data.businesses.length > 0) {
            const mainBusiness = data.businesses[0];
            localStorage.setItem('userRole', mainBusiness.role.toLowerCase());
            localStorage.setItem('userData', JSON.stringify(mainBusiness));
        }

        return data;


    },

    logout: () => {
        localStorage.clear();
    }
}