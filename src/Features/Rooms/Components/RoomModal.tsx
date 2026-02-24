import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Room } from '../../../Types/room';
// import { stat } from 'fs';
// import { ROOM_TYPES, ROOM_STATUSES, FLOORS, AMENITIES } from '../data';

interface RoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (room: Omit<Room, 'id'> | Room) => void;
    room?: Room | null;
    mode: 'add' | 'edit';
}

export const RoomModal: React.FC<RoomModalProps> = ({
    isOpen,
    onClose,
    onSave,
    room,
    mode,
}) => {
   const [formData, setFormData] = useState({
        room_number: '',
        room_type_name: '',
        floor: 0,
        status_name: '',
        price: '',
        status_id: 0,
        business_id: 0,
        capacity: 0,
        business_name: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
   });

    useEffect(() => {
        if (room && mode === 'edit') {
            setFormData({
                room_number: room.room_number,
                room_type_name: room.room_type_name,
                floor: room.floor,
                status_name: room.status_name,
                price: room.price,
                status_id: room.status_id,
                business_id: room.business_id,
                capacity: room.capacity,
                business_name: room.business_name,
                created_at: room.created_at,
                updated_at: room.updated_at,
            });
        } else {
            setFormData({
                room_number: '',
                room_type_name: '',
                floor: 0,
                status_name: '',
                price: '',
                status_id: 0,
                business_id: 0,
                business_name: '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                capacity: 0,
            });
        }
    }, [room, mode, isOpen]);

    // const handleAmenityToggle = (amenity: string) => {
    //     setFormData(prev => ({
    //         ...prev,
    //         amenities: prev.amenities.includes(amenity)
    //             ? prev.amenities.filter(a => a !== amenity)
    //             : [...prev.amenities, amenity],
    //     }));
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && room) {
            onSave({ ...formData, id: room.id });
        } else {
            onSave(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-[#002366]">
                        {mode === 'add' ? 'Add New Room' : 'Edit Room'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Room Number *
                            </label>
                            <input
                                type="text"
                                value={formData.room_number}
                                onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Room Type *
                            </label>
                            <select
                                value={formData.room_type_name}
                                onChange={(e) => setFormData({ ...formData, room_type_name: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                                
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Floor *
                            </label>
                            <select
                                value={formData.floor}
                                onChange={(e) => setFormData({ ...formData, floor: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                           
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Status
                            </label>
                            <select
                                value={formData.status_name}
                                onChange={(e) => setFormData({ ...formData, status_name: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                                    <option value="Available">Available</option>
                                    <option value="Occupied">Occupied</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Maintenance">Maintenance</option>

                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Price per Night (RS) *
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Capacity
                            </label>
                            <input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                                min="1"
                                max="10"
                            />
                        </div>
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Amenities
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {AMENITIES.map(amenity => (
                                <button
                                    key={amenity}
                                    type="button"
                                    onClick={() => handleAmenityToggle(amenity)}
                                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                                        formData.amenities.includes(amenity)
                                            ? 'bg-[#002366] text-white border-[#002366]'
                                            : 'bg-white text-slate-600 border-slate-300 hover:border-[#002366]'
                                    }`}
                                >
                                    {amenity}
                                </button>
                            ))}
                        </div>
                    </div> */}

                    {/* <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] resize-none"
                            rows={3}
                            placeholder="Optional room description..."
                        />
                    </div> */}

                    {/* Footer */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-[#002366] text-white rounded-lg font-medium hover:bg-primary transition-colors"
                        >
                            {mode === 'add' ? 'Add Room' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
