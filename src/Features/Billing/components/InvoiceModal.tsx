import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Invoice, InvoiceItem } from '../types';
import { PAYMENT_METHODS } from '../data';

interface InvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (invoice: Invoice) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        guestName: '',
        roomNumber: '',
        dueDate: '',
        paymentMethod: 'Cash' as const,
    });

    const [items, setItems] = useState<Omit<InvoiceItem, 'id' | 'amount'>[]>([]);
    const [itemForm, setItemForm] = useState({
        description: '',
        quantity: 1,
        rate: 0,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const calculateTotals = () => {
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
        const tax = subtotal * 0.18; // 18% tax
        return {
            subtotal,
            tax,
            total: subtotal + tax,
        };
    };

    const { subtotal, tax, total } = calculateTotals();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.guestName.trim()) {
            newErrors.guestName = 'Guest name is required';
        }
        if (!formData.roomNumber.trim()) {
            newErrors.roomNumber = 'Room number is required';
        }
        if (!formData.dueDate) {
            newErrors.dueDate = 'Due date is required';
        }
        if (items.length === 0) {
            newErrors.items = 'At least one item is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddItem = () => {
        if (!itemForm.description.trim()) {
            alert('Please enter item description');
            return;
        }
        if (itemForm.quantity <= 0) {
            alert('Quantity must be greater than 0');
            return;
        }
        if (itemForm.rate <= 0) {
            alert('Rate must be greater than 0');
            return;
        }

        setItems([...items, { ...itemForm }]);
        setItemForm({ description: '', quantity: 1, rate: 0 });
    };

    const handleRemoveItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const invoiceItems: InvoiceItem[] = items.map((item, idx) => ({
            id: `item-${idx}`,
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            amount: item.quantity * item.rate,
        }));

        const newInvoice: Invoice = {
            id: Date.now().toString(),
            invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(3, '0')}`,
            guestName: formData.guestName.trim(),
            roomNumber: formData.roomNumber.trim(),
            date: today,
            dueDate: formData.dueDate,
            items: invoiceItems,
            subtotal,
            tax: Math.round(tax * 100) / 100,
            total: Math.round(total * 100) / 100,
            status: 'Pending' as const,
            paymentMethod: formData.paymentMethod,
            paidAmount: 0,
        };

        onSave(newInvoice);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setFormData({
            guestName: '',
            roomNumber: '',
            dueDate: '',
            paymentMethod: 'Cash',
        });
        setItems([]);
        setItemForm({ description: '', quantity: 1, rate: 0 });
        setErrors({});
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#002366] to-[#001a4d] p-6 flex items-center justify-between rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Create New Invoice</h2>
                        <p className="text-blue-100 text-sm mt-1">Fill in the details to generate an invoice</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Guest Information Section */}
                    <div className="border-b border-slate-200 pb-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] text-sm font-bold">1</span>
                            Guest Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Guest Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.guestName}
                                    onChange={(e) => {
                                        setFormData({ ...formData, guestName: e.target.value });
                                        if (errors.guestName) {
                                            setErrors({ ...errors, guestName: '' });
                                        }
                                    }}
                                    placeholder="Enter guest name"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all ${
                                        errors.guestName
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-slate-300 focus:border-[#002366]'
                                    }`}
                                />
                                {errors.guestName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.guestName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Room Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.roomNumber}
                                    onChange={(e) => {
                                        setFormData({ ...formData, roomNumber: e.target.value });
                                        if (errors.roomNumber) {
                                            setErrors({ ...errors, roomNumber: '' });
                                        }
                                    }}
                                    placeholder="e.g., 201, 302"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all ${
                                        errors.roomNumber
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-slate-300 focus:border-[#002366]'
                                    }`}
                                />
                                {errors.roomNumber && (
                                    <p className="text-red-500 text-xs mt-1">{errors.roomNumber}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="border-b border-slate-200 pb-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] text-sm font-bold">2</span>
                            Invoice Items
                        </h3>

                        {/* Items List */}
                        {items.length > 0 && (
                            <div className="mb-4 bg-slate-50 rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-100 border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-slate-700 font-medium">Description</th>
                                            <th className="px-4 py-2 text-center text-slate-700 font-medium">Quantity</th>
                                            <th className="px-4 py-2 text-right text-slate-700 font-medium">Rate</th>
                                            <th className="px-4 py-2 text-right text-slate-700 font-medium">Amount</th>
                                            <th className="px-4 py-2 text-center text-slate-700 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, idx) => (
                                            <tr key={idx} className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                                                <td className="px-4 py-3 text-slate-700">{item.description}</td>
                                                <td className="px-4 py-3 text-center text-slate-700">{item.quantity}</td>
                                                <td className="px-4 py-3 text-right text-slate-700">RS{item.rate.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-right font-medium text-slate-800">RS{(item.quantity * item.rate).toFixed(2)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(idx)}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Add Item Form */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                            <p className="text-sm font-medium text-slate-700 mb-3">Add Item to Invoice</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input
                                    type="text"
                                    value={itemForm.description}
                                    onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                                    placeholder="Item description"
                                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 text-sm"
                                />
                                <input
                                    type="number"
                                    value={itemForm.quantity}
                                    onChange={(e) => setItemForm({ ...itemForm, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                                    placeholder="Quantity"
                                    min="1"
                                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 text-sm"
                                />
                                <input
                                    type="number"
                                    value={itemForm.rate}
                                    onChange={(e) => setItemForm({ ...itemForm, rate: Math.max(0, parseFloat(e.target.value) || 0) })}
                                    placeholder="Rate"
                                    min="0"
                                    step="0.01"
                                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 text-sm"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="w-full px-4 py-2 bg-[#002366] text-white rounded-lg font-medium hover:bg-[#001a4d] transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Plus size={16} />
                                Add Item
                            </button>
                        </div>

                        {errors.items && (
                            <p className="text-red-500 text-xs mt-2">{errors.items}</p>
                        )}
                    </div>

                    {/* Additional Details Section */}
                    <div className="border-b border-slate-200 pb-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] text-sm font-bold">3</span>
                            Additional Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Due Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => {
                                        setFormData({ ...formData, dueDate: e.target.value });
                                        if (errors.dueDate) {
                                            setErrors({ ...errors, dueDate: '' });
                                        }
                                    }}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all ${
                                        errors.dueDate
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-slate-300 focus:border-[#002366]'
                                    }`}
                                />
                                {errors.dueDate && (
                                    <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Payment Method <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.paymentMethod}
                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                                >
                                    {PAYMENT_METHODS.map(method => (
                                        <option key={method} value={method}>{method}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">Invoice Summary</h3>
                        <div className="space-y-2.5">
                            <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                <span className="text-slate-600">Subtotal:</span>
                                <span className="text-slate-800 font-medium">RS{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                <span className="text-slate-600">Tax (18%):</span>
                                <span className="text-slate-800 font-medium">RS{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 bg-white rounded-lg px-3 mt-3">
                                <span className="text-lg font-semibold text-[#002366]">Total:</span>
                                <span className="text-2xl font-bold text-[#002366]">RS{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#002366] to-[#001a4d] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
