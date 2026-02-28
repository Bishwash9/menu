import React from 'react';
import { X, Calendar, Hash, User, MapPin, ShoppingBag } from 'lucide-react';
import type { Order } from '../../../Types/order';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, order }) => {
    if (!isOpen) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-700';
        if (statusLower.includes('preparing')) return 'bg-blue-100 text-blue-700';
        if (statusLower.includes('ready')) return 'bg-purple-100 text-purple-700';
        if (statusLower.includes('served')) return 'bg-green-100 text-green-700';
        if (statusLower.includes('complete')) return 'bg-slate-100 text-slate-700';
        if (statusLower.includes('cancel')) return 'bg-red-100 text-red-700';
        return 'bg-slate-100 text-slate-600';
    };

    const getItemStatusColor = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('pending')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        if (statusLower.includes('cooking') || statusLower.includes('preparing')) return 'bg-orange-50 text-orange-700 border-orange-200';
        if (statusLower.includes('cooked') || statusLower.includes('ready')) return 'bg-green-50 text-green-700 border-green-200';
        return 'bg-slate-50 text-slate-700 border-slate-200';
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white p-6 border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#002366]/10 rounded-lg">
                            <ShoppingBag size={24} className="text-[#002366]" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#002366]">
                                Order #{order.order_number}
                            </h2>
                            <p className="text-sm text-slate-500">{order.business_name}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Order Info */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Hash size={18} className="text-[#002366]" />
                                <span className="text-sm text-slate-600">Order ID:</span>
                                <span className="font-semibold text-slate-900">{order.id}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status_name)}`}>
                                {order.status_name}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-[#002366]" />
                                <span className="text-sm text-slate-600">Location:</span>
                                <span className="font-medium text-slate-900">
                                    {order.is_room_order ? `Room ${order.room_id}` : `Table ${order.table_id || order.table_id}`}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <User size={18} className="text-[#002366]" />
                                <span className="text-sm text-slate-600">Type:</span>
                                <span className="font-medium text-slate-900">{order.order_type_name}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-[#002366]" />
                                <span className="text-sm text-slate-600">Created:</span>
                                <span className="font-medium text-slate-900 text-sm">{formatDate(order.created_at)}</span>
                            </div>
                            
                            {order.served_by && (
                                <div className="flex items-center gap-2">
                                    <User size={18} className="text-[#002366]" />
                                    <span className="text-sm text-slate-600">Served By:</span>
                                    <span className="font-medium text-slate-900">{order.served_by}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">Order Items</h3>
                        <div className="space-y-2">
                            {order.items.map((item) => (
                                <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-slate-900">{item.food_item_name}</h4>
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getItemStatusColor(item.status_name)}`}>
                                                    {item.status_name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-slate-600">
                                                <span>Qty: <strong>{item.quantity}</strong></span>
                                                <span>@ Rs. {parseFloat(item.unit_price).toFixed(2)}</span>
                                                <span className="ml-auto font-semibold text-slate-900">Rs. {parseFloat(item.total_price).toFixed(2)}</span>
                                            </div>
                                            {item.note && (
                                                <p className="text-sm text-slate-500 mt-2 italic">Note: {item.note}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Notes */}
                    {order.notes && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-2">Order Notes</h3>
                            <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">{order.notes}</p>
                        </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">Price Breakdown</h3>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Subtotal:</span>
                            <span className="font-medium">Rs. {parseFloat(order.subtotal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Tax:</span>
                            <span className="font-medium">Rs. {parseFloat(order.tax).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Discount:</span>
                            <span className="font-medium text-green-600">- Rs. {parseFloat(order.discount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-slate-300 pt-2 mt-2">
                            <span>Total Amount:</span>
                            <span className="text-[#002366]">Rs. {parseFloat(order.total_amount).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end pt-4 border-t">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};