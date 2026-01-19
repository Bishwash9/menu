import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { MenuItem } from '../../../Lib/data';


// TYPES & INTERFACES


export interface CartItem extends MenuItem {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    cartTotal: number;
    cartCount: number;

    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: number) => void;
    updateQuantity: (itemId: number, delta: number) => void;
    toggleCart: () => void;
}

// CONTEXT CREATION

const CartContext = createContext<CartContextType | undefined>(undefined);


// PROVIDER COMPONENT


export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // ACTION: Add an item to the cart
    const addToCart = (item: MenuItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);

            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // ACTION: Remove an item completely
    const removeFromCart = (itemId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    // ACTION: Increase or Decrease quantity
    const updateQuantity = (itemId: number, delta: number) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + delta;
                    return { ...item, quantity: Math.max(1, newQuantity) };
                }
                return item;
            });
        });
    };

    // ACTION: Toggle sidebar visibility
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    const cartCount = useMemo(() => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }, [cartItems]);

    const value = {
        cartItems,
        isCartOpen,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


// CUSTOM HOOK


export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
