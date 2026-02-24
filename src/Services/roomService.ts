import { apiClient } from "../Config/api";
import type { Room } from "../Types/room";

export const roomService = {

    getRooms: async (businessId:number): Promise<Room[]> =>{
        const response = await apiClient(`room/b${businessId}/`, {
            method: 'GET'
        });

        if(!response || !response.data){
            throw new Error('Failed to fetch rooms. Please try again later.');
        }

        return response.data || response;
    },

    getRoomById : async (businessId:number, roomId:number): Promise<Room> =>{
        const response = await apiClient(`room/b${businessId}/${roomId}/`, {
            method: 'GET'
        });

        if(!response || !response.data){
            throw new Error('Failed to fetch room details. Please try again later.');
        }
        
        return response.data || response;
    }
}