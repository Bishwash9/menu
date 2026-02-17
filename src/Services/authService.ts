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
        // for business login
        if (data.business && data.business.length > 0) {
            const mainBusiness = data.business[0];
            localStorage.setItem('userRole', mainBusiness.role.toLowerCase());
            localStorage.setItem('businessType', mainBusiness.business_type);
            localStorage.setItem('userData', JSON.stringify(mainBusiness));

        }else if(data.staff){
            localStorage.setItem('userRole', data.staff.role.toLowerCase());
            localStorage.setItem('userData', JSON.stringify(data.staff));
        }

        return data;


    },

    logout: () => {
        localStorage.clear();
    }
}