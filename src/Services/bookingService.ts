import { apiClient } from "../Config/api";
import type { Booking } from "../Types/booking";

export const bookingService = {
    getBookings: async (businessId: number): Promise<Booking[]> => {
        const response = await apiClient(`booking/b${businessId}/`, {
            method: 'GET'
        });

        if(!response){
            throw new Error('Failed to fetch bookings. Please try again later.');
        }

        // Handle different response formats
    
        if (response.bookings && Array.isArray(response.bookings)) {
            return response.bookings;
        }

        
        return [];
    },

    getSingleBooking: async (businessId: number, bookingId: number): Promise<Booking> => {
        const response = await apiClient(`booking/b${businessId}/bk${bookingId}/`, {
            method: 'GET'
        });

        if(!response){
            throw new Error('Failed to fetch booking. Please try again later.');
        }

        return response.data || response;
    }
}