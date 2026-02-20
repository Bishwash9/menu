import { apiClient } from "../Config/api";
import type { MenuItem } from "../Types/menu";


export const menuService = {
    getMenuItems: async (businessId:number): Promise<MenuItem[]> => {
        const response  = await apiClient(`menu/b${businessId}`, {
            method: 'GET'
        });
        return response.data || response; //handle both cases wheere data is array or object
    },

    getMenuItemById: async (id:number) => {
        const response = await apiClient(`menu/${id}`, {
            method: 'GET'
        });
        return response.data || response;
    }
}