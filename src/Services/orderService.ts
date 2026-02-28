import {apiClient} from '../Config/api';
import type { CreateOrderRequest, Order } from '../Types/order';
export const orderService ={
    getOrders: async (businessId: number, tableId?: number, roomId?: number): Promise<Order[]> =>{
      let endpoint = `order/b${businessId}/`;
      const params = [];
      if(tableId){
        params.push(`table_id=${tableId}`);
      }
      if(roomId){
        params.push(`room_id=${roomId}`);
      }
      if(params.length > 0){
        endpoint += `?${params.join('&')}`;
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
        const response = await apiClient (`order/${orderId}/`,{
            method: 'GET'
        });
        return response
    },

    createOrder: async (businessId: number, orderData: CreateOrderRequest): Promise<Order> => {
        const response = await apiClient(`order/b${businessId}/`, {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
        return response.data || response;

    }
}