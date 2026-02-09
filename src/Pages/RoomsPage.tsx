import React, { useState } from 'react';
import { Plus, BedDouble, CheckCircle, Users, Wrench} from 'lucide-react';
import { SideBar } from '../Components/Layout/Sidebar';
import { DashboardHeader } from '../Components/Layout';
import {
    RoomStatCard,
    RoomModal,
    RoomContent,
    initialRooms
} from '../Features/Rooms';
import type { Room, RoomStats } from '../Features/Rooms/Types';

const RoomsPage: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [roomStatusFilter, setRoomStatusFilter] = useState<'All' | 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance'>('All');


    // Calculate stats
    const stats: RoomStats = {
        totalRooms: rooms.length,
        available: rooms.filter(r => r.status === 'Available').length,
        occupied: rooms.filter(r => r.status === 'Occupied').length,
        cleaning: rooms.filter(r => r.status === 'Cleaning').length,
        maintenance: rooms.filter(r => r.status === 'Maintenance').length,
    };

    const handleAddRoom = () => {
        setModalMode('add');
        setSelectedRoom(null);
        setIsModalOpen(true);
    };

    const handleEditRoom = (room: Room) => {
        setModalMode('edit');
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleViewRoom = (room: Room) => {
        // For now, just open in edit mode for viewing
        setModalMode('edit');
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleDeleteRoom = (roomId: string) => {
        setRooms(rooms.filter(r => r.id !== roomId));
    };

    const handleSaveRoom = (roomData: Omit<Room, 'id'> | Room) => {
        if ('id' in roomData) {
            // Update existing room
            setRooms(rooms.map(r => r.id === roomData.id ? roomData : r));
        } else {
            // Add new room
            const newRoom: Room = {
                ...roomData,
                id: Date.now().toString(),
            };
            setRooms([...rooms, newRoom]);
        }
    };

    return (
        <div className="flex h-screen bg-dashboard-bg">
            <SideBar />

            <main className="flex-1 overflow-auto">
                {/* Header Space */}

                <div className="h-16 bg-white border-b border-slate-200">
                    <DashboardHeader />
                </div>

                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

                        <div className="flex gap-3 flex-wrap w-full justify-between">
                            <div className="flex gap-2 flex-wrap">
                                {['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setRoomStatusFilter(status as any)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${roomStatusFilter === status
                                            ? 'bg-[#002366] text-white'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleAddRoom}
                                className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#b8962e] transition-colors shadow-sm"
                            >
                                <Plus size={18} />
                                Add Room
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <RoomStatCard
                            title="Total Rooms"
                            value={stats.totalRooms}
                            icon={<BedDouble size={24} className="text-[#002366]" />}
                            iconBgColor="bg-[#002366]/10"
                        />
                        <RoomStatCard
                            title="Available"
                            value={stats.available}
                            icon={<CheckCircle size={24} className="text-green-600" />}
                            iconBgColor="bg-green-100"
                            valueColor="text-green-600"
                        />
                        <RoomStatCard
                            title="Occupied"
                            value={stats.occupied}
                            icon={<Users size={24} className="text-blue-600" />}
                            iconBgColor="bg-blue-100"
                            valueColor="text-blue-600"
                        />
                        <RoomStatCard
                            title="Cleaning/Maint."
                            value={stats.cleaning + stats.maintenance}
                            icon={<Wrench size={24} className="text-orange-600" />}
                            iconBgColor="bg-orange-100"
                            valueColor="text-orange-600"
                        />
                    </div>

                    {/* Room Content */}
                    <RoomContent
                        rooms={rooms.filter(r => {
                            const matchesStatus = roomStatusFilter === 'All' || r.status === roomStatusFilter;
                  
                            return matchesStatus;
                        })}
                        onView={handleViewRoom}
                        onEdit={handleEditRoom}
                        onDelete={handleDeleteRoom}
                    />
                </div>
            </main>

            {/* Modal */}
            <RoomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRoom}
                room={selectedRoom}
                mode={modalMode}
            />
        </div>
    );
};

export default RoomsPage;
