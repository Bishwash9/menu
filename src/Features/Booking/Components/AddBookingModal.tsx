import React, { useState } from 'react';
import { X, Calendar, User, DoorOpen } from 'lucide-react';
import { bookingService } from '../../../Services/bookingService';
import { useAuth } from '../../../Context/AuthContext';
import type { CreateBookingRequest } from '../../../Types/booking';

interface AddBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
   
    const {user} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        room_id: '',
        guest_id: '',
        check_in: '',
        check_out: '',
    });

    if(!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

    if(!user?.business_id){
        setError('User does not have a business id');
        return;
    }

    //basic validation
    const checkInDate = new Date(formData.check_in);
    const checkOutDate = new Date(formData.check_out);
    const date = new Date();

    if(checkInDate <= date){
        setError('Check-in date must be in the future');
        return;
    }

    if(checkOutDate <= checkInDate){
        setError('Check-out date must be after check-in date');
        return;
    }

    const payload: CreateBookingRequest = {
        room_id: Number(formData.room_id),
        guest_id: Number(formData.guest_id),
        check_in: checkInDate.toISOString(),
        check_out: checkOutDate.toISOString(),
    };

    setIsSubmitting(true);

    try{
        await bookingService.createBooking(user.business_id, payload);
        onSuccess();
        onClose();

        //reset form data
        setFormData({room_id: '', guest_id: '', check_in: '', check_out: ''});

    } catch (err) {
        setError('Failed to create booking');
    } finally {
        setIsSubmitting(false);
    }
};

        return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-status-confirmed">
                        New Booking
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}
                    {/* Room ID */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                            <DoorOpen size={16} className="text-status-confirmed" />
                            Room ID
                        </label>
                        <input
                            type="number"
                            name="room_id"
                            value={formData.room_id}
                            onChange={handleChange}
                            required
                            min={1}
                            placeholder="Enter room ID"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                        />
                    </div>
                    {/* Guest ID */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                            <User size={16} className="text-status-confirmed" />
                            Guest ID
                        </label>
                        <input
                            type="number"
                            name="guest_id"
                            value={formData.guest_id}
                            onChange={handleChange}
                            required
                            min={1}
                            placeholder="Enter guest ID"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                        />
                    </div>
                    {/* Check In */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                            <Calendar size={16} className="text-status-confirmed" />
                            Check-in Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="check_in"
                            value={formData.check_in}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                        />
                    </div>
                    {/* Check Out */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                            <Calendar size={16} className="text-status-confirmed" />
                            Check-out Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="check_out"
                            value={formData.check_out}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                        />
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-status-confirmed text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

