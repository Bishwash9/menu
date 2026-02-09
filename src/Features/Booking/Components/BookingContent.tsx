import React, { useState } from 'react';
import {
    Search,
    Filter,
} from 'lucide-react';
import type { Booking, BookingStatus } from '../Types';
import { StatusBadge, PaymentBadge } from './Badges';

interface BookingContentProps {
    bookings: Booking[];
    onEdit?: (booking: Booking) => void;
    onDelete?: (bookingId: string) => void;
    onView?: (booking: Booking) => void;
    onConfirm?: (bookingId: string) => void;
}

export const BookingContent: React.FC<BookingContentProps> = ({
    bookings,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>  ('');

    const handleStatusFilterChange = (status: BookingStatus) =>{
        if(statusFilter === status){
            setStatusFilter('');
        }else{
            setStatusFilter(status);
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getDayDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const filteredBookings = bookings.filter(b => {
        const matchesSearch = 
            b.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter ? b.status === statusFilter : true;
        return matchesSearch && matchesStatus;
});

    return (
        <div className="space-y-4">
            {/* --- Search and Filter --- */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-[60%]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-status-confirmed focus:border-status-confirmed transition-all"
                    />
                </div>

                 <select 
                 value={statusFilter}
                 onChange ={ (e)=> handleStatusFilterChange(e.target.value as BookingStatus)}
                 className="px-[2vw] py-[1.5vh] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-status-confirmed/20 focus:border-status-confirmed transition-all">
                    <option value="">All Status</option>
                    {['confirmed', 'pending', 'checked-in', 'checked-out', 'cancelled'].map(status=>(
                        <option key ={status} value= {status}>{status}</option>
                    ))}
                 </select>
            </div>

            {/* --- Bookings Section --- */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h2 className="text-lg font-bold text-status-confirmed flex items-center gap-2">
                        Recent Bookings
                        <span className="bg-status-confirmed/10 text-status-confirmed text-xs px-2 py-1 rounded-full">{filteredBookings.length} found</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">{getDayDate()}</p>
                </div>

                {/* --- Desktop/Tablet Table View --- */}
                <div className="hidden md:block bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-4 text-left font-bold text-slate-700">Booking ID</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Guest</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Room</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Check In/Out</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Nights</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Amount</th>
                                    <th className="p-4 text-center font-bold text-slate-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-4 font-bold text-status-confirmed">{booking.id}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${booking.guest.avatarColor === 'royal' ? 'bg-status-confirmed' : 'bg-dashboard-accent'}`}>
                                                    {booking.guest.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-status-confirmed">{booking.guest.name}</p>
                                                    <p className="text-xs text-slate-400">ID: {booking.guest.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 font-medium">
                                            {booking.room.number} - {booking.room.type}
                                        </td>
                                        <td className="p-4">
                                            <div className="text-xs text-slate-600">
                                                <p className="mb-1"><span className="text-slate-400 w-4 inline-block">In:</span> {formatDate(booking.checkIn)}</p>
                                                <p><span className="text-slate-400 w-4 inline-block">Out:</span> {formatDate(booking.checkOut)}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm font-bold text-status-confirmed bg-blue-50 px-2 py-1 rounded">
                                                {booking.nights} nights
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-bold text-[#D4AF37]">
                                            Rs. {booking.amount}
                                        </td>
                                        <td className="p-4 text-center">
                                            <StatusBadge status={booking.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Mobile Card View --- */}
                <div className="md:hidden space-y-4">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative border-l-status-confirmed">

                            {/* Card Header */}
                            <div className="p-4 border-b border-slate-50 flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md ${booking.guest.avatarColor === 'royal' ? 'bg-status-confirmed' : 'bg-dashboard-accent'}`}>
                                        {booking.guest.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-status-confirmed">{booking.id}</span>
                                            <span className="text-slate-300">|</span>
                                            <span className="text-xs text-slate-500 font-medium">{booking.room.number} - {booking.room.type}</span>
                                        </div>
                                        <h3 className="font-bold text-status-confirmed">{booking.guest.name}</h3>
                                    </div>
                                </div>
                                <StatusBadge status={booking.status} />
                            </div>

                            {/* Card Body */}
                            <div className="p-4 grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Check In</p>
                                    <p className="text-sm font-medium text-status-confirmed">{formatDate(booking.checkIn).split(',')[0]}</p>
                                    <p className="text-xs text-slate-500">{formatDate(booking.checkIn).split(',')[1]}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Check Out</p>
                                    <p className="text-sm font-medium text-status-confirmed">{formatDate(booking.checkOut).split(',')[0]}</p>
                                    <p className="text-xs text-slate-500">{formatDate(booking.checkOut).split(',')[1]}</p>
                                </div>

                                <div className="col-span-2 flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
                                    <span className="text-sm font-bold text-status-confirmed bg-blue-50 px-2 py-1 rounded">
                                        {booking.nights} Nights
                                    </span>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-[#D4AF37]">Rs. {booking.amount}</span>
                                        <div className="flex justify-end mt-1">
                                            <PaymentBadge status={booking.payment} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
