import {apiClient} from '../Config/api';
import type { Order } from '../Types/order';
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
        const response = await apiClient (`orders/${orderId}/`,{
            method: 'GET'
        });
        return response
    },

    //create order for room
    createOrderRoom: async (businessId: number,roomId: number, orderData: any): Promise<Order> =>{
        const response = await apiClient(`orders/`, {
            method: 'POST',
            body: JSON.stringify({
             ...orderData,
             room_id: roomId,
             business_id: businessId  
            })
        });
        return response.data || response;
    },

    //create order for table
    createOrderTable: async (businessId: number,tableId: number, orderData: any): Promise<Order> => {
        const response = await apiClient(`orders/`, {
            method: 'POST',
            body: JSON.stringify({
                ...orderData,
                table_id: tableId,
                business_id: businessId
            })
        });
        return response.data || response;
    }
}