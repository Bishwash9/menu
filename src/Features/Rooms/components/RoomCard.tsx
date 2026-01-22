import React from 'react';
import { MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';
import type { Room } from '../Types';

interface RoomCardProps {
    room: Room;
    onView?: (room: Room) => void;
    onEdit?: (room: Room) => void;
    onDelete?: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
    room,
    onView,
    onEdit,
    onDelete,
}) => {
    const [showMenu, setShowMenu] = React.useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Occupied':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Cleaning':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Maintenance':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Header */}
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#002366]">{room.roomNumber}</h3>
                        <p className="text-sm text-slate-500">{room.type}</p>
                        <p className="text-xs text-slate-400">{room.floor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(room.status)}`}>
                            {room.status}
                        </span>
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <MoreVertical size={16} className="text-slate-400" />
                            </button>
                            {showMenu && (
                                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[120px] z-10">
                                    <button
                                        onClick={() => { onView?.(room); setShowMenu(false); }}
                                        className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                    >
                                        <Eye size={14} /> View
                                    </button>
                                    <button
                                        onClick={() => { onEdit?.(room); setShowMenu(false); }}
                                        className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                    >
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => { 
                                            if (confirm(`Delete room ${room.roomNumber}?`)) {
                                                onDelete?.(room.id);
                                            }
                                            setShowMenu(false); 
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Amenities */}
            <div className="p-4">
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded"
                        >
                            {amenity}
                        </span>
                    ))}
                    {room.amenities.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-[#002366]/10 text-[#002366] rounded">
                            +{room.amenities.length - 3}
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-[#002366]">RS{room.price}</span>
                        <span className="text-sm text-slate-500">/night</span>
                    </div>
                    <button
                        onClick={() => onView?.(room)}
                        className="text-sm font-medium text-[#D4AF37] hover:text-[#b8962e] transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};
