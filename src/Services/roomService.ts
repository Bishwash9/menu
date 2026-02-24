import { apiClient } from "../Config/api";

export const roomService = {

    getRooms: async (businessId:number) =>{
        const response = await apiClient(`room/b${businessId}/`, {
            method: 'GET'
        });

        if(!response || !response.data){
            throw new Error('Failed to fetch rooms. Please try again later.');
        }

        return response.data || response;
    },

    getRoomById : async (businessId:number, roomId:number) =>{
        const response = await apiClient(`room/${businessId}/${roomId}/`, {
            method: 'GET'
        });

        if(!response || !response.data){
            throw new Error('Failed to fetch room details. Please try again later.');
        }
        
        return response.data || response;
    }
}