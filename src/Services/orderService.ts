import {apiClient} from '../Config/api';
import type { Order } from '../Types/order';
export const orderService ={
    getOrders: async (tableId?:number, roomId?:number): Promise<Order[]> =>{
      let endpoint = 'orders/';
      if(tableId){
        endpoint += `?table_id=${tableId}`;
      }
      if(roomId){
        endpoint += `?room_id=${roomId}`;
      }
      const response = await apiClient(endpoint, {
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
    },

    //create order for room
    createOrder: async (businessId: number,roomId: number, orderData: any): Promise<Order> =>{
        const response = await apiClient(`orders/`, {
            method: 'POST',
            body: JSON.stringify({
             ...orderData,
             room_id: roomId,
             business_id: businessId  
            })
        });
        return response.data || response;
    }
}