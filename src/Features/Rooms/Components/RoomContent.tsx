import React from 'react';
import type { Room } from '../../../Types/room';
import { RoomCard } from './RoomCard';

interface RoomContentProps {
    rooms: Room[];
    onView?: (room: Room) => void;
    onEdit?: (room: Room) => void;
    onDelete?: (roomId: number) => void;
}

export const RoomContent: React.FC<RoomContentProps> = ({
    rooms,
    onView,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="space-y-6">
            {/* Room Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rooms.map(room => (
                    <RoomCard
                        key={room.id}
                        room={room}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {rooms.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p className="text-lg">No rooms found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};
