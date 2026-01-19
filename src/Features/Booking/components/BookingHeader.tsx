import React from 'react';
import { Download } from 'lucide-react';

interface BookingHeaderProps {
    onExport?: () => void;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({ onExport }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E3A8A] mb-1">
                    Bookings Management
                </h1>
                <p className="text-slate-500 text-sm md:text-base">
                    Manage all hotel bookings and reservations in one place
                </p>
            </div>

            <button 
                onClick={onExport}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold hover:bg-[#1E3A8A] hover:text-white transition-all duration-300 shadow-sm active:scale-95 w-full md:w-auto justify-center min-h-[44px]"
            >
                <Download size={18} />
                Export
            </button>
        </div>
    );
};
