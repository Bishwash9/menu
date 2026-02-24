import React, { useEffect, useState } from 'react';
import { Plus, BedDouble, CheckCircle, Users, Wrench } from 'lucide-react';
import { roomService } from '../Services/roomService';
import {
    RoomStatCard,
    RoomModal,
    RoomContent,
    
} from '../Features/Rooms';
import type {  RoomStats } from '../Features/Rooms/Types';
import type { Room } from '../Types/room';


const RoomsPage: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [roomStatusFilter, setRoomStatusFilter] = useState<'All' | 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance'>('All');


    useEffect(() => {
        const fetchRooms = async () =>{
            try{
                setLoading(true);
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                const businessId = userData.business_id;

               if(businessId){
                 const data = await roomService.getRooms(businessId);
                 const mappedRooms  = data.map((r:Room)=>({
                    id: r.id,
                    business_id: r.business_id,
                    room_number: r.room_number,
                    room_type_name: r.room_type_name,
                    business_name: r.business_name,
                    status_name: r.status_name,
                    status_id: r.status_id,
                    floor: r.floor,
                    capacity: r.capacity,
                    price: r.price,
                    created_at: r.created_at,
                    updated_at: r.updated_at,

                 }));
                 setRooms(mappedRooms);
               }
               
                
            }catch(error){
                setError('Failed to load rooms. Please try again later.');

            }finally{
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);


    // Calculate stats
    const stats: RoomStats = {
        totalRooms: rooms.length,
        available: rooms.filter(r => r.status_name === 'Available').length,
        occupied: rooms.filter(r => r.status_name === 'Occupied').length,
        cleaning: rooms.filter(r => r.status_name === 'Cleaning').length,
        maintenance: rooms.filter(r => r.status_name === 'Maintenance').length,
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

    const handleDeleteRoom = (roomId: number) => {
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
                id: Date.now(),
            };
            setRooms([...rooms, newRoom]);
        }
    };

    return (
        <div className="space-y-6">
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

            {/* Loading State */}
            {loading && (
                <div className='flex justify-center items-center py-20'>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Stats Cards */}
            {!loading && (
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
            )}

            {/* Room Content */}
            {!loading && (
            <RoomContent
                rooms={rooms.filter(r => {
                    const matchesStatus = roomStatusFilter === 'All' || r.status_name === roomStatusFilter;

                    return matchesStatus;
                })}
                onView={handleViewRoom}
                onEdit={handleEditRoom}
                onDelete={handleDeleteRoom}
            />
            )}

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
