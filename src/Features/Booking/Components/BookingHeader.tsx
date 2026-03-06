import React from 'react';
import {  Plus } from 'lucide-react';

interface BookingHeaderProps {
    onAddBooking: () => void;  // new prop
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({onAddBooking }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-status-confirmed mb-1">
                    Bookings Management
                </h1>
                <p className="text-slate-500 text-sm md:text-base">
                    Manage all hotel bookings and reservations in one place
                </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">

                <button
                    onClick={onAddBooking}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-status-confirmed text-white font-bold hover:opacity-90 transition-all duration-300 shadow-sm active:scale-95 flex-1 md:flex-none justify-center min-h-11"
                >
                    <Plus size={18} />
                    New Booking
                </button>
            </div>
        </div>
    );
};
