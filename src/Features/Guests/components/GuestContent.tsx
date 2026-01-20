import React, { useState } from 'react';
import { Search, MoreVertical, Mail, Phone, Eye, Edit2, Trash2, Star } from 'lucide-react';
import type { Guest, GuestStatus } from '../types';

interface GuestContentProps {
    guests: Guest[];
    onView?: (guest: Guest) => void;
    onEdit?: (guest: Guest) => void;
    onDelete?: (guestId: string) => void;
}

export const GuestContent: React.FC<GuestContentProps> = ({
    guests,
    onView,
    onEdit,
    onDelete,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = 
            guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guest.phone.includes(searchQuery);
        return matchesSearch;
    });

    const getStatusColor = (status: GuestStatus) => {
        switch (status) {
            case 'Checked In': return 'bg-green-100 text-green-700';
            case 'Checked Out': return 'bg-slate-100 text-slate-700';
            case 'Reserved': return 'bg-blue-100 text-blue-700';
            case 'VIP': return 'bg-[#D4AF37]/20 text-[#D4AF37]';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, role, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                    />
                </div>
            </div>

            {/* Guest Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredGuests.map(guest => (
                    <div key={guest.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                    guest.status === 'VIP' ? 'bg-[#D4AF37]' : 'bg-[#002366]'
                                }`}>
                                    {guest.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 flex items-center gap-1">
                                        {guest.name}
                                        {guest.status === 'VIP' && <Star size={14} className="text-[#D4AF37] fill-[#D4AF37]" />}
                                    </h3>
                                    <p className="text-xs text-slate-500">{guest.nationality}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setActiveMenu(activeMenu === guest.id ? null : guest.id)}
                                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <MoreVertical size={16} className="text-slate-400" />
                                </button>
                                {activeMenu === guest.id && (
                                    <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[100px] z-10">
                                        <button
                                            onClick={() => { onView?.(guest); setActiveMenu(null); }}
                                            className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                        >
                                            <Eye size={14} /> View
                                        </button>
                                        <button
                                            onClick={() => { onEdit?.(guest); setActiveMenu(null); }}
                                            className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                        >
                                            <Edit2 size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() => { 
                                                if (confirm(`Delete guest ${guest.name}?`)) onDelete?.(guest.id); 
                                                setActiveMenu(null); 
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Mail size={14} className="text-slate-400" />
                                <span className="truncate">{guest.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone size={14} className="text-slate-400" />
                                <span>{guest.phone}</span>
                            </div>
                        </div>

                        {guest.roomNumber && (
                            <div className="text-sm text-slate-600 mb-3">
                                🛏️ Room {guest.roomNumber}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(guest.status)}`}>
                                {guest.status}
                            </span>
                            <span className="text-xs text-slate-500">
                                {guest.totalStays} stays
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredGuests.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p className="text-lg">No guests found</p>
                    <p className="text-sm">Try adjusting your search</p>
                </div>
            )}
        </div>
    );
};
