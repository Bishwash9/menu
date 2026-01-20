import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Room, RoomStatus } from '../types';
import { ROOM_STATUSES } from '../data';
import { RoomCard } from './RoomCard';

interface RoomContentProps {
    rooms: Room[];
    onView?: (room: Room) => void;
    onEdit?: (room: Room) => void;
    onDelete?: (roomId: string) => void;
}

export const RoomContent: React.FC<RoomContentProps> = ({
    rooms,
    onView,
    onEdit,
    onDelete,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<RoomStatus | 'All'>('All');

    const filteredRooms = rooms.filter(room => {
        const matchesSearch = 
            room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || room.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const filterButtons: (RoomStatus | 'All')[] = ['All', ...ROOM_STATUSES];

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {filterButtons.map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                statusFilter === status
                                    ? 'bg-[#002366] text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#002366] hover:text-[#002366]'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                    />
                </div>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredRooms.map(room => (
                    <RoomCard
                        key={room.id}
                        room={room}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {filteredRooms.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p className="text-lg">No rooms found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};
