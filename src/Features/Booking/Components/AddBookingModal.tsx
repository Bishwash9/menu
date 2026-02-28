import React from 'react';
import { X, Calendar, User, DoorOpen, Hash } from 'lucide-react';
import type { Booking } from '../Types';

interface AddBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking?: Booking;
}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
    isOpen,
    onClose,
    booking,
}) => {
    if (!isOpen || !booking) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-status-confirmed">
                        Booking Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Booking ID & Status */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Hash size={20} className="text-status-confirmed" />
                                <span className="font-semibold text-slate-700">Booking #{booking.id}</span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-status-confirmed text-white">
                                {booking.status_name}
                            </span>
                        </div>
                    </div>

                    {/* Guest Information */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <User size={20} className="text-status-confirmed" />
                            Guest Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-500">Guest Name</label>
                                <p className="text-base font-medium text-slate-800">{booking.guest_name}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-500">Guest ID</label>
                                <p className="text-base font-medium text-slate-800">#{booking.guest_id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Room Information */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <DoorOpen size={20} className="text-status-confirmed" />
                            Room Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-500">Room Number</label>
                                <p className="text-base font-medium text-slate-800">{booking.room_number}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-500">Room ID</label>
                                <p className="text-base font-medium text-slate-800">#{booking.room_id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Dates */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <Calendar size={20} className="text-status-confirmed" />
                            Booking Dates
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-500">Check-in</label>
                                <p className="text-base font-medium text-slate-800">{formatDate(booking.check_in)}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-500">Check-out</label>
                                <p className="text-base font-medium text-slate-800">{formatDate(booking.check_out)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-slate-700">Additional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-500">Business Name</label>
                                <p className="text-base font-medium text-slate-800">{booking.business_name}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-500">Created</label>
                                <p className="text-base font-medium text-slate-800">{formatDate(booking.created_at)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
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
