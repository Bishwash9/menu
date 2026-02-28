import { apiClient } from "../Config/api";
import type { Staff } from "../Types/staff";

export const staffService = {
    getStaff: async (businessId: number): Promise<Staff[]> => {
        const response = await apiClient(`staff/b${businessId}/`, {
            method: 'GET'
        });

        if(!response){
            throw new Error('Failed to fetch staff. Please try again later.');
        }

        return Array.isArray(response) ? response : (response.data || response);
    }
}