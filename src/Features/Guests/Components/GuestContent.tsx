import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import type { Guest } from '../../../Types/guest';

interface GuestContentProps {
    guests: Guest[];
    onEdit?: (guest: Guest) => void;
    onDelete?: (guestId: number) => void;
    onAddNew: () => void;
}

export const GuestContent: React.FC<GuestContentProps> = ({
    guests,
    onAddNew,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const uniqueStatuses = ['All', ...new Set(guests.map(guest => guest.status_name))];

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = 
            guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guest.phone.includes(searchQuery);
        const matchesStatus = statusFilter === 'All' || guest.status_name === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'checked in':
                return 'bg-green-100 text-green-700';
            case 'checked out':
                return 'bg-red-100 text-red-700';
            case 'reserved':
                return 'bg-blue-100 text-blue-700';
            case 'vip':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-end">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search guests by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                >
                    {uniqueStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

                <button
                onClick={onAddNew}
                className='px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors font-bold'>
    
                    <Plus size={18} />
                    Add Guest
                </button>
                <button
                    onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('All');
                    }}
                    className="px-4 py-2 text-accent font-bold hover:underline"
                >
                    Clear
                </button>
            </div>

            {/* Guests List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Phone</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">ID Type</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Checked In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGuests.map(guest => (
                            <tr key={guest.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-800">{guest.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{guest.phone}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{guest.verify_name}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(guest.status_name)}`}>
                                        {guest.status_name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(guest.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredGuests.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                        No guests found
                    </div>
                )}
            </div>
        </div>
    );
};