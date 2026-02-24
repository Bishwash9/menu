import { apiClient } from "../Config/api";

export const tableService = {
    getTables: async (businessId:number) =>{
        const response = await apiClient(`tables/b${businessId}`, {
            method: 'GET'
        });

        if(!response){
            throw new Error('Failed to fetch tables. Please try again later.');
        }

        return Array.isArray(response) ? response : (response.data || response);
    },

    getTablesById: async (businessId:number, tableId: number) =>{
        const response = await apiClient(`tables/b${businessId}/${tableId}`, {
            method: 'GET'
        });

        if(!response){
            throw new Error('Failed to fetch table details. Please try again later.');
        }

        return response.data || response;
    }
}