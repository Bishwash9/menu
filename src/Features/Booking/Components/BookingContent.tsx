import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Booking } from '../../../Types/booking';

interface BookingContentProps {
    bookings: Booking[];
    onEdit?: (booking: Booking) => void;
    onDelete?: (bookingId: number) => void;
    onView?: (booking: Booking) => void;
}

export const BookingContent: React.FC<BookingContentProps> = ({
    bookings,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const uniqueStatuses = ['All', ...new Set(bookings.map(b => b.status_name))];

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
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

    const calculateNights = (checkIn: string, checkOut: string) => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const filteredBookings = bookings.filter(b => {
        const matchesSearch =
            b.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.id.toString().includes(searchQuery);

        const matchesStatus = statusFilter === 'All' || b.status_name === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'checked-in':
            case 'checked in':
                return 'bg-blue-100 text-blue-700';
            case 'checked-out':
            case 'checked out':
                return 'bg-gray-100 text-gray-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search bookings by guest name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                >
                    {uniqueStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            {/* Bookings Section */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h2 className="text-lg font-bold text-[#002366] flex items-center gap-2">
                        Recent Bookings
                        <span className="bg-[#002366]/10 text-[#002366] text-xs px-2 py-1 rounded-full">
                            {filteredBookings.length} found
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">{getDayDate()}</p>
                </div>

                {/* Desktop Table View */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-4 text-left font-bold text-slate-700">Booking ID</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Guest</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Room</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Check In</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Check Out</th>
                                    <th className="p-4 text-left font-bold text-slate-700">Nights</th>
                                    <th className="p-4 text-center font-bold text-slate-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-bold text-[#002366]">#{booking.id}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#002366] text-white text-sm font-bold shadow-sm">
                                                    {booking.guest_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{booking.guest_name}</p>
                                                    <p className="text-xs text-slate-400">Guest ID: {booking.guest_id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 font-medium">
                                            Room {booking.room_number}
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">
                                            {formatDate(booking.check_in)}
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">
                                            {formatDate(booking.check_out)}
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm font-bold text-[#002366] bg-blue-50 px-2 py-1 rounded">
                                                {calculateNights(booking.check_in, booking.check_out)} nights
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(booking.status_name)}`}>
                                                {booking.status_name}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            No bookings found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};