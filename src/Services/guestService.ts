import { apiClient } from "../Config/api";
import type { CreateGuestRequest, Guest } from "../Types/guest";

export const guestService = {
    getGuest: async (businessId: number): Promise<Guest[]> => {
        const response = await apiClient(`guest/b${businessId}/`, {
            method: 'GET'

        });

        if(!response){
            throw new Error('Failed to fetch guests. Please try again later.');
        }

        return Array.isArray(response) ? response : (response.data || response);
    },

    addGuest: async (businessId: number, guestData: CreateGuestRequest): Promise<Guest> => {
        const response = await apiClient(`guest/b${businessId}/`, {
            method: 'POST',
            body: JSON.stringify(guestData)
        });

        if(!response){
            throw new Error('Failed to add guest. Please try again later.');
        }

        return response.data || response;
    }
}