import React, { useState, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../Services/cartService';
import { orderService } from '../Services/orderService';
import type { CartItem } from '../Types/cart';
import type { CreateOrderRequest, CreateOrderItem } from '../Types/order';

interface CartReviewPopupProps {
    target: { type: 'table' | 'room'; id: number };
    identifier: string; // table number or room number
    onClose: () => void;
}

const CartReviewPopup: React.FC<CartReviewPopupProps> = ({ target, identifier, onClose }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedItems, setSelectedItems] = useState<number[]>([]); 
    const [isDeleting, setIsDeleting] = useState(false);

    //toggle selection
    const toggleSelection = (foodItemId: number) => {
        setSelectedItems(prev =>{
            if(prev.includes(foodItemId)){
                return prev.filter(id => id! == foodItemId);
            }else{
                return [...prev, foodItemId]
            }
        });
    };

    // Fetch cart items on mount
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        if (!user?.business_id) return;

        setLoading(true);
        setError(null);

        try {
            const items = target.type === 'table'
                ? await cartService.getTableCart(user.business_id, target.id)
                : await cartService.getRoomCart(user.business_id, target.id);
            
            setCartItems(items || []);
        } catch (err: any) {
            console.error('Error fetching cart:', err);
            setError('Failed to load cart items');
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteOrder = async () => {
        if (!user?.business_id || cartItems.length === 0) {
            setError('Cart is empty');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Prepare order items from cart
            const orderItems: CreateOrderItem[] = cartItems.map(item => ({
                food_item_id: item.food_item_id,
                food_item_name: item.food_item_name,
                quantity: item.quantity,
                status_id: 1,
                note: ''
            }));

            // Calculate totals
            const subtotal = cartItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
            const tax = subtotal * 0.13;
            const total = subtotal + tax;

            // Create order payload
            const orderPayload: CreateOrderRequest = {
                business_id: user.business_id,
                ...(target.type === 'table' ? { table_id: target.id } : { room_id: target.id }),
                order_type_id: 1,
                order_number: `ORD-${Date.now()}`,
                status_id: 1,
                subtotal: subtotal.toFixed(2),
                tax: tax.toFixed(2),
                discount: '0',
                total_amount: total.toFixed(2),
                is_room_order: target.type === 'room',
                items: orderItems
            };

            // Create the order
            const createdOrder = await orderService.createOrder(user.business_id, orderPayload);

            const foodItemIds = cartItems.map(item => item.food_item_id);

            const clearSuccess = target.type === 'table'
                ? await cartService.clearTableCart(user.business_id, target.id,foodItemIds)
                : await cartService.clearRoomCart(user.business_id, target.id,foodItemIds);

            if (!clearSuccess) {
                console.warn('Cart clear endpoint is not supported; order was created successfully.');
            }

            // Close popup and navigate to order details
            onClose();
            navigate(`/orders/${createdOrder.id}`);
        } catch (err: any) {
            console.error('Error creating order:', err);
            setError(err.message || 'Failed to create order');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSelected = async () => {
        if(!user?.business_id || selectedItems.length === 0) return;

        setIsDeleting(true);
        setError(null);

        try{
            const deleteSuccess = target.type === 'table'
                ? await cartService.clearTableCart(user.business_id, target.id, selectedItems)
                : await cartService.clearRoomCart(user.business_id, target.id, selectedItems);

                if(deleteSuccess){
                    setCartItems(prev => prev.filter(item => !selectedItems.includes(item.food_item_id)));
                    setSelectedItems([]);
                }else{
                    setError('Failed to delete selected items');
                }
        }catch(error){
            console.error('Error deleting items:', error);
            setError('Failed to delete selected items');    
        }finally{
            setIsDeleting(false);
        }
    };

  

    const subtotal = cartItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-primary text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingCart size={24} />
                        <div>
                            <h2 className="text-xl font-bold">Cart Review</h2>
                            <p className="text-sm text-blue-200">
                                {target.type === 'table' ? 'Table' : 'Room'} {identifier}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex-1 flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="p-6 flex-1 overflow-y-auto min-h-0">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingCart className="mx-auto text-slate-300 mb-4" size={48} />
                                    <p className="text-slate-500">Your cart is empty</p>
                                </div>
                            ) : (
                                
                                <>
                                {selectedItems.length > 0 && (
                                        <div className="flex justify-end mb-3">
                                            <button 
                                                onClick={handleDeleteSelected}
                                                disabled={isDeleting}
                                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
                                            >
                                                {isDeleting ? 'Deleting...' : `Delete ${selectedItems.length} Selected`}
                                            </button>
                                        </div>
                                )}
                             
                                <div className="space-y-3">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <input 
                                                        type="checkbox" 
                                                        className="w-5 h-5 cursor-pointer bg-primary text-white rounded border-slate-300"
                                                        checked={selectedItems.includes(item.food_item_id)}
                                                        onChange={() => toggleSelection(item.food_item_id)}
                                                    />
                                                    <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-xs font-bold">
                                                        {item.quantity}x
                                                    </span>
                                                    <div>
                                                        <div className='flex flex-col'>
                                                            <h3 className='font-bold text-slate-800'>
                                                                {item.food_item_name}
                                                            </h3>

                                                            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">
                                                            Item #{item.food_item_id}
                                                            </span>
                                                        </div>
                                                        
                                                        <p className="text-sm text-slate-500">
                                                            Rs. {item.unit_price} each
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-lg text-slate-900">
                                                    Rs. {item.total_price.toFixed(2)}
                                                </span>
                                            
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </>
                            )}
                        </div>

                        {/* Summary */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-slate-200 bg-slate-50 p-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Subtotal</span>
                                    <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Tax (13%)</span>
                                    <span className="font-semibold">Rs. {tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-3 border-t border-slate-300">
                                    <span>Total Amount</span>
                                    <span className="text-primary">Rs. {total.toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCompleteOrder}
                                disabled={cartItems.length === 0 || isSubmitting}
                                className="flex-1 py-3 bg-[#002366] text-white rounded-xl font-bold hover:bg-[#001a47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={18} />
                                        Complete Order
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartReviewPopup;
