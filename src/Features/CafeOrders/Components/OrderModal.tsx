import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CafeOrder, OrderItem, OrderType, OrderStatus, Priority } from '../Types';
import { ORDER_TYPES, ORDER_STATUSES, PRIORITIES } from '../data';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (order: Omit<CafeOrder, 'id' | 'orderNumber' | 'createdAt'> | CafeOrder) => void;
    order?: CafeOrder | null;
    mode: 'add' | 'edit';
}

// Mock menu items for quick add
const quickMenuItems = [
    { name: 'Paneer Butter Masala', price: 320 },
    { name: 'Butter Naan', price: 60 },
    { name: 'Dal Makhani', price: 240 },
    { name: 'Chicken Biryani', price: 350 },
    { name: 'Veg Pulao', price: 220 },
    { name: 'Coffee', price: 80 },
    { name: 'Tea', price: 40 },
    { name: 'Fresh Lime Soda', price: 60 },
];

export const OrderModal: React.FC<OrderModalProps> = ({
    isOpen,
    onClose,
    onSave,
    order,
    mode,
}) => {
    const [formData, setFormData] = useState<Omit<CafeOrder, 'id' | 'orderNumber' | 'createdAt'>>({
        customer: '',
        type: 'Dine In',
        items: [],
        total: 0,
        status: 'Pending',
        paymentStatus: 'Pending',
        priority: 'Normal',
    });

    useEffect(() => {
        if (order && mode === 'edit') {
            setFormData({
                customer: order.customer,
                type: order.type,
                tableNumber: order.tableNumber,
                roomNumber: order.roomNumber,
                items: order.items,
                total: order.total,
                status: order.status,
                paymentStatus: order.paymentStatus,
                priority: order.priority,
                notes: order.notes,
            });
        } else {
            setFormData({
                customer: '',
                type: 'Dine In',
                items: [],
                total: 0,
                status: 'Pending',
                paymentStatus: 'Pending',
                priority: 'Normal',
            });
        }
    }, [order, mode, isOpen]);

    const calculateTotal = (items: OrderItem[]) => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const addItem = (menuItem: { name: string; price: number }) => {
        const existingIndex = formData.items.findIndex(item => item.name === menuItem.name);
        let newItems: OrderItem[];
        
        if (existingIndex >= 0) {
            newItems = formData.items.map((item, idx) => 
                idx === existingIndex 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newItems = [...formData.items, {
                id: Date.now().toString(),
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1,
            }];
        }
        
        setFormData({ ...formData, items: newItems, total: calculateTotal(newItems) });
    };

    const updateItemQuantity = (itemId: string, change: number) => {
        const newItems = formData.items.map(item => {
            if (item.id === itemId) {
                const newQty = Math.max(0, item.quantity + change);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0);
        
        setFormData({ ...formData, items: newItems, total: calculateTotal(newItems) });
    };

    const removeItem = (itemId: string) => {
        const newItems = formData.items.filter(item => item.id !== itemId);
        setFormData({ ...formData, items: newItems, total: calculateTotal(newItems) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && order) {
            onSave({ ...formData, id: order.id, orderNumber: order.orderNumber, createdAt: order.createdAt });
        } else {
            onSave(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
                    <h2 className="text-xl font-bold text-[#002366]">
                        {mode === 'add' ? 'New Order' : 'Edit Order'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                value={formData.customer}
                                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                placeholder="Walk-in Customer"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Order Type
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as OrderType })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                                {ORDER_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {formData.type === 'Dine In' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Table Number
                            </label>
                            <input
                                type="text"
                                value={formData.tableNumber || ''}
                                onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                                placeholder="e.g., T1"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            />
                        </div>
                    )}

                    {formData.type === 'Room Service' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Room Number
                            </label>
                            <input
                                type="text"
                                value={formData.roomNumber || ''}
                                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                                placeholder="e.g., 201"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            />
                        </div>
                    )}

                    {/* Quick Menu */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Quick Add Items
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {quickMenuItems.map((item, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => addItem(item)}
                                    className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-[#002366] hover:text-white text-slate-600 rounded-full transition-colors"
                                >
                                    {item.name} - RS{item.price}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Order Items
                        </label>
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            {formData.items.length === 0 ? (
                                <div className="p-4 text-center text-slate-500">
                                    No items added yet
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {formData.items.map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-3 hover:bg-slate-50">
                                            <div>
                                                <p className="font-medium text-slate-800">{item.name}</p>
                                                <p className="text-sm text-slate-500">RS{item.price} each</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateItemQuantity(item.id, -1)}
                                                        className="p-1 hover:bg-slate-200 rounded"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateItemQuantity(item.id, 1)}
                                                        className="p-1 hover:bg-slate-200 rounded"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <span className="font-medium text-[#002366] w-20 text-right">
                                                    RS{item.price * item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="bg-slate-50 p-3 flex justify-between items-center border-t border-slate-200">
                                <span className="font-medium text-slate-700">Total</span>
                                <span className="text-xl font-bold text-[#002366]">RS{formData.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                                {ORDER_STATUSES.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Priority
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                                {PRIORITIES.map(priority => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-[#002366] text-white rounded-lg font-medium hover:bg-[#001a4d] transition-colors"
                        >
                            {mode === 'add' ? 'Create Order' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
