import { apiClient } from "../Config/api";


export const menuSerive = {
    getMenuItems: async () => {
        const response  = await apiClient('menu', {
            method: 'GET'
        })
    }
}