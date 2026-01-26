import React from 'react';
import { Star } from 'lucide-react';

interface RoomPerformance {
    room: string;
    bookings: number;
    revenue: number;
    rating: number;
}

interface TopRoomsTableProps {
    data: RoomPerformance[];
}

export const TopRoomsTable: React.FC<TopRoomsTableProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    🏆 Top Performing Rooms
                </h3>
                <p className="text-sm text-slate-500">Based on revenue this month</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-slate-600">Room</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-600">Bookings</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-600">Revenue</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-600">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((room, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-slate-800">{room.room}</td>
                                <td className="px-4 py-3 text-slate-600">{room.bookings}</td>
                                <td className="px-4 py-3 font-semibold text-[#D4AF37]">
                                    RS{(room.revenue / 1000).toFixed(0)}K
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                        <span className="text-slate-700">{room.rating}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
