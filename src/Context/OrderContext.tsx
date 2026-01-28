import { createContext, useContext, useState } from 'react';

interface Order {
    orderId: string;
    items: any[]; // Ideally list your specific Item type here too
    locationId: string;
    type: 'table' | 'room';
    status: 'pending' | 'completed';
    createdAt: string;
}
// Tell the Context it will hold an object of Orders or be undefined
interface OrderContextType {
    orders: Record<string, Order>;
    createOrder: (data: Omit<Order, 'orderId' | 'createdAt' | 'status'>) => string;
}

//create a context jesma undefined is default
export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {

    const [orders, setOrders] = useState<Record<string, Order>>({});

    const createOrder = (orderData: Omit<Order, 'orderId' | 'createdAt' | 'status'>) => {

        //check for existing pending order for same location and type
        const existingOrderId = Object.values(orders).find((order)=>(
            order.locationId === orderData.locationId &&
            order.type === orderData.type &&
            order.status === 'pending'
        ))?.orderId;

        //if found merge items to existing order
        if(existingOrderId){
            setOrders((prevOrders)=>{
                const existingOrder = prevOrders[existingOrderId];

                //creating a copy of existing items for modifying
                const mergedItems = [...existingOrder.items];
            
                //loop through new items to merge
                orderData.items.forEach((newItem)=>{
                    const existingItemsIndex = mergedItems.findIndex(item=>item.id === newItem.id);
                    
                    if(existingItemsIndex > -1){
                        //if item exists update qunatity
                        mergedItems[existingItemsIndex] = {
                            ...mergedItems[existingItemsIndex],
                            quantity:mergedItems[existingItemsIndex].quantity + newItem.quantity
                        };
                    }else{
                        mergedItems.push(newItem);
                    }
                });



                return {
                    ...prevOrders,
                    [existingOrderId]: {
                        ...existingOrder,
                        items:mergedItems
                    }
                };
            });
            return existingOrderId;

        }

        //if not found create new order
        const orderId = crypto.randomUUID();

        const newOrder: Order = {
            ...orderData,
            orderId,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        setOrders((prevOrders) => ({ ...prevOrders, [orderId]: newOrder }));
        return orderId;
    }

    return (
        <OrderContext.Provider value={{ orders, createOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

//creating a custom hook for easy access
export const useOrders = () => {
    const context = useContext(OrderContext);


    //safety check to ensure hook is used inisde OrderProvider in App.tsx
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}

