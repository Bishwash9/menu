import React, { useState } from 'react';
import {
    Search,
    Filter,
    Eye,
    CheckCircle,
    PenSquare,
    Trash2,
} from 'lucide-react';
import type { Booking } from '../Types';
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
    onEdit,
    onDelete,
    onView,
    onConfirm,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredBookings = bookings.filter(b => 
        b.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all"
                    />
                </div>

                <div className="w-full md:w-auto flex flex-1 gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                        <Filter size={18} />
                        <span className="hidden sm:inline">All Status</span>
                        <span className="sm:hidden">Filter</span>
                    </button>
                    <button className="px-4 py-3 min-h-[44px] text-[#1E3A8A] font-bold hover:underline whitespace-nowrap">
                        Clear All
                    </button>
                </div>
            </div>

            {/* --- Bookings Section --- */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h2 className="text-lg font-bold text-[#1E3A8A] flex items-center gap-2">
                        Recent Bookings
                        <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs px-2 py-1 rounded-full">{filteredBookings.length} found</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">{getDayDate()}</p>
                </div>

                {/* --- Desktop/Tablet Table View --- */}
                <div className="hidden md:block bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guest</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Room</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Check In/Out</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nights</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-4 font-bold text-[#1E3A8A]">{booking.id}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${booking.guest.avatarColor === 'royal' ? 'bg-[#1E3A8A]' : 'bg-[#D4AF37]'}`}>
                                                    {booking.guest.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700">{booking.guest.name}</p>
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
                                            <span className="text-sm font-bold text-[#1E3A8A] bg-blue-50 px-2 py-1 rounded">
                                                {booking.nights} nights
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-bold text-[#D4AF37]">
                                            ${booking.amount}
                                        </td>
                                        <td className="p-4 text-center">
                                            <StatusBadge status={booking.status} />
                                            <div className="mt-1">
                                                <PaymentBadge status={booking.payment} />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2 opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => onView?.(booking)}
                                                    className="p-2 text-[#1E3A8A] hover:bg-blue-50 rounded-full transition-colors cursor-pointer" 
                                                    title="View"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => onEdit?.(booking)}
                                                    className="p-2 text-[#1E3A8A] hover:bg-blue-50 rounded-full transition-colors cursor-pointer" 
                                                    title="Edit"
                                                >
                                                    <PenSquare size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => onConfirm?.(booking.id)}
                                                    className="p-2 text-[#D4AF37] hover:bg-yellow-50 rounded-full transition-colors cursor-pointer" 
                                                    title="Confirm"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this booking?')) {
                                                            onDelete?.(booking.id);
                                                        }
                                                    }}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer" 
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
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
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative border-l-4 border-l-[#1E3A8A]">

                            {/* Card Header */}
                            <div className="p-4 border-b border-slate-50 flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md ${booking.guest.avatarColor === 'royal' ? 'bg-[#1E3A8A]' : 'bg-[#D4AF37]'}`}>
                                        {booking.guest.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#1E3A8A]">{booking.id}</span>
                                            <span className="text-slate-300">|</span>
                                            <span className="text-xs text-slate-500 font-medium">{booking.room.number} - {booking.room.type}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-800">{booking.guest.name}</h3>
                                    </div>
                                </div>
                                <StatusBadge status={booking.status} />
                            </div>

                            {/* Card Body */}
                            <div className="p-4 grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Check In</p>
                                    <p className="text-sm font-medium text-slate-700">{formatDate(booking.checkIn).split(',')[0]}</p>
                                    <p className="text-xs text-slate-500">{formatDate(booking.checkIn).split(',')[1]}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Check Out</p>
                                    <p className="text-sm font-medium text-slate-700">{formatDate(booking.checkOut).split(',')[0]}</p>
                                    <p className="text-xs text-slate-500">{formatDate(booking.checkOut).split(',')[1]}</p>
                                </div>

                                <div className="col-span-2 flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
                                    <span className="text-sm font-bold text-[#1E3A8A] bg-blue-50 px-2 py-1 rounded">
                                        {booking.nights} Nights
                                    </span>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-[#D4AF37]">${booking.amount}</span>
                                        <div className="flex justify-end mt-1">
                                            <PaymentBadge status={booking.payment} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Actions */}
                            <div className="bg-slate-50 p-3 flex justify-between gap-2">
                                <button 
                                    onClick={() => onView?.(booking)}
                                    className="flex-1 min-h-[44px] py-2 rounded-lg border border-[#1E3A8A] text-[#1E3A8A] font-bold text-sm hover:bg-blue-50 cursor-pointer"
                                >
                                    View
                                </button>
                                <button 
                                    onClick={() => onEdit?.(booking)}
                                    className="flex-1 min-h-[44px] py-2 rounded-lg bg-[#D4AF37] text-white font-bold text-sm hover:bg-[#F59E0B] shadow-sm cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this booking?')) {
                                            onDelete?.(booking.id);
                                        }
                                    }}
                                    className="w-11 h-11 flex items-center justify-center rounded-lg bg-red-100 text-red-500 hover:bg-red-200 cursor-pointer"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
