import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Booking } from '../Types';

interface AddBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (booking: Booking) => void;
    editingBooking?: Booking;    viewOnly?: boolean;}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
    isOpen,
    onClose,
    onAdd,
    editingBooking,
}) => {
    const [formData, setFormData] = useState({
        guestName: editingBooking?.guest.name || '',
        guestId: editingBooking?.guest.id || '',
        roomNumber: editingBooking?.room.number || '',
        roomType: editingBooking?.room.type || '',
        checkIn: editingBooking?.checkIn.split('T')[0] || '',
        checkOut: editingBooking?.checkOut.split('T')[0] || '',
        amount: editingBooking?.amount || '',
        status: editingBooking?.status || 'pending',
        payment: editingBooking?.payment || 'pending',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const checkIn = new Date(formData.checkIn);
        const checkOut = new Date(formData.checkOut);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

        const newBooking: Booking = {
            id: editingBooking?.id || `BK${Math.floor(Math.random() * 10000)}`,
            guest: {
                name: formData.guestName,
                id: formData.guestId,
                avatarColor: Math.random() > 0.5 ? 'royal' : 'golden',
            },
            room: {
                number: formData.roomNumber,
                type: formData.roomType,
            },
            checkIn: `${formData.checkIn}T14:00:00`,
            checkOut: `${formData.checkOut}T11:00:00`,
            nights,
            amount: parseInt(formData.amount as any),
            status: formData.status as any,
            payment: formData.payment as any,
        };

        onAdd(newBooking);
        setFormData({
            guestName: '',
            guestId: '',
            roomNumber: '',
            roomType: '',
            checkIn: '',
            checkOut: '',
            amount: '',
            status: 'pending',
            payment: 'pending',
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 min-h-screen md:min-h-[100vh]">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-[#1E3A8A]">
                        {editingBooking ? 'Edit Booking' : 'Add New Booking'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Guest Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-700">Guest Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Guest Name *
                                </label>
                                <input
                                    type="text"
                                    name="guestName"
                                    value={formData.guestName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                                    placeholder="Enter guest name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Guest ID *
                                </label>
                                <input
                                    type="text"
                                    name="guestId"
                                    value={formData.guestId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                                    placeholder="Enter guest ID"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Room Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-700">Room Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Room Number *
                                </label>
                                <input
                                    type="text"
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                                    placeholder="e.g., 101"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Room Type *
                                </label>
                                <select
                                    name="roomType"
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                                >
                                    <option value="">Select room type</option>
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                    <option value="Deluxe">Deluxe</option>
                                    <option value="Suite">Suite</option>
                                    <option value="Presidential">Presidential</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Booking Dates */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-700">Booking Dates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Check In Date *
                                </label>
                                <input
                                    type="date"
                                    name="checkIn"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Check Out Date *
                                </label>
                                <input
                                    type="date"
                                    name="checkOut"
                                    value={formData.checkOut}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-700">Payment Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Amount ($) *
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Payment Status *
                                </label>
                                <select
                                    name="payment"
                                    value={formData.payment}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Booking Status */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Booking Status *
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="checked-in">Checked In</option>
                            <option value="checked-out">Checked Out</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-2 md:py-3 rounded-lg border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors min-h-[44px]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-2 md:py-3 rounded-lg bg-[#1E3A8A] text-white font-bold hover:bg-[#1E3A8A]/90 transition-colors min-h-[44px]"
                        >
                            {editingBooking ? 'Update Booking' : 'Add Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
