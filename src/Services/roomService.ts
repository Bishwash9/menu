import { apiClient } from "../Config/api";
import type { Room } from "../Types/room";

export const roomService = {

    getRooms: async (businessId: number): Promise<Room[]> => {
        const response = await apiClient(`room/b${businessId}`, {
            method: 'GET'
        });

        if (!response) {
            throw new Error('Failed to fetch rooms. Please try again later.');
        }

        return Array.isArray(response) ? response : (response.data || response);
    },

    getRoomById: async (businessId: number, roomId: number): Promise<Room> => {
        const response = await apiClient(`room/b${businessId}/${roomId}`, {
            method: 'GET'
        });

        if (!response) {
            throw new Error('Failed to fetch room details. Please try again later.');
        }

        return response.data || response;
    },

    createRoom: async (businessId: number, roomData: Omit<Room, 'id'>): Promise<Room> => {
        const response = await apiClient(`room/b${businessId}`, {
            method: 'POST',
            body: JSON.stringify(roomData)
        });

        if (!response) {
            throw new Error('Failed to create room. Please try again later.');
        }

        return response.data || response;
    }
}