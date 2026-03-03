import { apiClient } from "../Config/api";
import type { CreateStaffRequest, Staff } from "../Types/staff";

export const staffService = {
    getStaff: async (businessId: number): Promise<Staff[]> => {
        const response = await apiClient(`staff/b${businessId}/`, {
            method: 'GET'
        });

        if(!response){
            throw new Error('Failed to fetch staff. Please try again later.');
        }

        return response?.staff || [];
    },
    
    addStaff: async (businessId: number, staffData: CreateStaffRequest) => {
        const response = await apiClient (`staff/b${businessId}/`, {
            method: 'POST',
            body: JSON.stringify(staffData)
        });

         if(!response){
            throw new Error('Failed to create staff. Please try again later.');
         }

        return response.staff || response;
    }


   
}