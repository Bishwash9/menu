import  { useState } from 'react';
import { useCart } from '../../../Context/CartContext';
import { useAuth } from '../../../Context/AuthContext';
import { cartService } from '../../../Services/cartService';
import type { CartAddRequest } from '../../../Types/cart';

interface CartSidebarProps {
    target: { type: 'table' | 'room'; id: number };
    identifier: string; // table/room number
    onCartSubmitted: () => void; // Callback after successfully adding to cart
}

export function CartSidebar({ target, identifier, onCartSubmitted }: CartSidebarProps) {
    const { localCartItems, clearLocalCart } = useCart();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const subtotal = localCartItems.reduce(
        (sum, item) => sum + (item.unit_price * item.quantity), 
        0
    );
    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    const handleAddToCart = async () => {
        if (!user?.business_id || localCartItems.length === 0) {
            setError('No items to add');
            return;
        }

        if (!target || !target.type || !target.id) {
            console.error('Target validation failed:', target);
            setError('No target specified');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Prepare cart items
            const cartItems: CartAddRequest[] = localCartItems.map(item => ({
                food_item_id: item.food_item_id,
                quantity: item.quantity,
                unit_price: item.unit_price
            }));

            // POST to cart API
            if (target.type === 'table') {
                await cartService.addToTableCart(user.business_id, target.id, cartItems);
            } else {
                await cartService.addToRoomCart(user.business_id, target.id, cartItems);
            }

            // Clear local cart after successful submission
            clearLocalCart();
            
            // Notify parent component
            onCartSubmitted();
        } catch (err: any) {
            console.error('Error adding to cart:', err);
            setError(err.message || 'Failed to add items to cart');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">Cart</h3>
                <p className="text-xs text-slate-500 mt-1">
                    {target ? `${target.type === 'table' ? 'Table' : 'Room'}: ${identifier}` : 'Select items'}
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {localCartItems.length === 0 ? (
                    <p className="text-center text-slate-500 text-sm py-8">
                        No items added yet
                    </p>
                ) : (
                    localCartItems.map((item) => (
                        <div key={item.food_item_id} className="bg-slate-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-semibold text-slate-800">
                                    {item.name}
                                </span>
                                <span className="text-xs bg-[#002366] text-white px-2 py-1 rounded">
                                    {item.quantity}x
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-600">
                                <span>Unit: Rs. {item.unit_price.toFixed(2)}</span>
                                <span className="font-bold text-slate-900">
                                    Rs. {(item.unit_price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Summary */}
            <div className="p-4 border-t border-slate-200 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tax (13%):</span>
                    <span className="font-semibold">Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200">
                    <span>Total:</span>
                    <span className="text-[#002366]">Rs. {total.toFixed(2)}</span>
                </div>
            </div>

            {/* Add to Cart Button */}
            <div className="p-4 border-t border-slate-200">
                <button
                    onClick={handleAddToCart}
                    disabled={localCartItems.length === 0 || isSubmitting}
                    className="w-full py-3 bg-[#002366] hover:bg-[#001a47] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Adding to Cart...' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}