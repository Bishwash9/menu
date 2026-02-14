import {apiClient} from '../Config/api';
import type { Order } from '../Types/order';
export const orderService ={
    getOrders: async (tableId?:number): Promise<Order[]> =>{
        const endpoint = tableId? `orders/?table_id=${tableId}` : 'orders/';
        const response = await apiClient(endpoint,{
            method: 'GET'
        });
        if(response?.orders && Array.isArray(response.orders)){
            return response.orders;
        }
        throw new Error('Invalid response format from orders API');
        
    },
    
    //get orders by ID
    getOrderById: async (orderId:number): Promise<Order> =>{
        const response = await apiClient (`orders/${orderId}/`,{
            method: 'GET'
        });
        return response
    }
}