

import { createContext, useContext, useState,  } from 'react';
import type { ReactNode } from 'react';

export interface LocalCartItem {
    food_item_id: number;
    name: string;
    quantity: number;
    unit_price: number;
}

interface CartContextType {
    localCartItems: LocalCartItem[];
    addToLocalCart: (item: Omit<LocalCartItem, 'quantity'>) => void;
    updateLocalQuantity: (foodItemId: number, delta: number) => void;
    removeFromLocalCart: (foodItemId: number) => void;
    clearLocalCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [localCartItems, setLocalCartItems] = useState<LocalCartItem[]>([]);

    const addToLocalCart = (item: Omit<LocalCartItem, 'quantity'>) => {
        setLocalCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.food_item_id === item.food_item_id);
            
            if (existingItem) {
                return prevItems.map((i) =>
                    i.food_item_id === item.food_item_id 
                        ? { ...i, quantity: i.quantity + 1 } 
                        : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const updateLocalQuantity = (foodItemId: number, delta: number) => {
        setLocalCartItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.food_item_id === foodItemId) {
                    const newQuantity = item.quantity + delta;
                    if (newQuantity <= 0) {
                        return null; // Will be filtered out
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter((item): item is LocalCartItem => item !== null);
        });
    };

    const removeFromLocalCart = (foodItemId: number) => {
        setLocalCartItems((prevItems) => 
            prevItems.filter(item => item.food_item_id !== foodItemId)
        );
    };

    const clearLocalCart = () => {
        setLocalCartItems([]);
    };

    const value = {
        localCartItems,
        addToLocalCart,
        updateLocalQuantity,
        removeFromLocalCart,
        clearLocalCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};