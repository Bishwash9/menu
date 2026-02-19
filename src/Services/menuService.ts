import { apiClient } from "../Config/api";
import type { MenuItem } from "../Features/MenuManagement";


export const menuService = {
    getMenuItems: async (): Promise<MenuItem[]> => {
        const response  = await apiClient('menu', {
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