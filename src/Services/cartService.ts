import { apiClient } from "../Config/api";

const normalizeCartItems = (response: any) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.cart_items)) return response.cart_items;
    if (Array.isArray(response?.cartItems)) return response.cartItems;
    return [];
};

const tryClearCart = async (endpoint: string) => {
    try {
        await apiClient(endpoint, {
            method: 'DELETE'
        });
        return true;
    } catch {
        try {
            await apiClient(endpoint, {
                method: 'POST',
                body: JSON.stringify([])
            });
            return true;
        } catch {
            return false;
        }
    }
};

export const cartService = {
    // Add items to cart for a table
    addToTableCart: async (businessId: number, tableId: number, items: any[]) => {
        const response = await apiClient(`cart/b${businessId}/t${tableId}/`, {
            method: 'POST',
            body: JSON.stringify(items)
        });
        return response;
    },

    // Add items to cart for a room
    addToRoomCart: async (businessId: number, roomId: number, items: any[]) => {
        const response = await apiClient(`cart/b${businessId}/r${roomId}/`, {
            method: 'POST',
            body: JSON.stringify(items)
        });
        return response;
    },

    // Get cart for a table
    getTableCart: async (businessId: number, tableId: number) => {
        const response = await apiClient(`cart/b${businessId}/t${tableId}/`, {
            method: 'GET'
        });
        return normalizeCartItems(response);
    },

    // Get cart for a room
    getRoomCart: async (businessId: number, roomId: number) => {
        const response = await apiClient(`cart/b${businessId}/r${roomId}/`, {
            method: 'GET'
        });
        return normalizeCartItems(response);
    },

    // Clear cart
    clearTableCart: async (businessId: number, tableId: number) => {
        return tryClearCart(`cart/b${businessId}/t${tableId}/`);
    },

    clearRoomCart: async (businessId: number, roomId: number) => {
        return tryClearCart(`cart/b${businessId}/r${roomId}/`);
    }
};