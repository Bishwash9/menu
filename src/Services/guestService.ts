import { apiClient } from "../Config/api";
import type { Guest } from "../Types/guest";

export const guestService = {
    getGuest: async (businessId: number): Promise<Guest[]> => {
        const response = await apiClient(`guest/b${businessId}/`, {
            method: 'GET'

        });

        if(!response){
            throw new Error('Failed to fetch guests. Please try again later.');
        }

        return Array.isArray(response) ? response : (response.data || response);
    }
}