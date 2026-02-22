import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { MenuItem } from '../Types/menu';


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
    clearCart: () => void;
}

// CONTEXT CREATION

const CartContext = createContext<CartContextType | undefined>(undefined);


// PROVIDER COMPONENT


export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    // EFFECT: Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

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
        const idToCompare = typeof itemId === 'string' ? parseInt(itemId) : itemId;
        setCartItems((prevItems) => prevItems.filter((item) => {
            const item_id = typeof item.id === 'string' ? parseInt(item.id) : item.id;
            return item_id !== idToCompare;
        }));
    };

    // ACTION: Increase or Decrease quantity
    const updateQuantity = (itemId: number, delta: number) => {
        const idToCompare = typeof itemId === 'string' ? parseInt(itemId) : itemId;
        setCartItems((prevItems) => {
            return prevItems.map((item) => {
                const item_id = typeof item.id === 'string' ? parseInt(item.id) : item.id;
                if (item_id === idToCompare) {
                    const newQuantity = item.quantity + delta;
                    return { ...item, quantity: Math.max(1, newQuantity) };
                }
                return item;
            });
        });
    };

    // ACTION: Toggle sidebar visibility
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // ACTION: Clear the entire cart
    const clearCart = () => setCartItems([]);

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return total + (price * item.quantity);
        }, 0);
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
        clearCart,
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
