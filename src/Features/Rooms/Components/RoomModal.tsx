import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Room } from '../../../Types/room';

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
        room_type_id: 0,
        status_id: 1,
        floor: 1,
        price: '',
        capacity: 1,
        amenity_ids: [] as number[],
   });

    useEffect(() => {
        if (room && mode === 'edit') {
            setFormData({
                room_number: room.room_number,
                room_type_id: room.room_type_id || 0,
                status_id: room.status_id,
                floor: room.floor,
                price: room.price,
                capacity: room.capacity,
                amenity_ids: room.amenities?.map(a => a.amenity_id) || [],
            });
        } else {
            setFormData({
                room_number: '',
                room_type_id: 0,
                status_id: 1,
                floor: 1,
                price: '',
                capacity: 1,
                amenity_ids: [],
            });
        }
    }, [room, mode, isOpen]);

    const handleSubmit =  (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as any);
    
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
                                value={formData.room_type_id}
                                onChange={(e) => setFormData({ ...formData, room_type_id: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                                <option value="0">Select Type</option>
                                <option value="1">Normal</option>
                                <option value="2">Deluxe</option>
                                <option value="3">Suite</option>
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
                                <option value="1">1st Floor</option>
                                <option value="2">2nd Floor</option>
                                <option value="3">3rd Floor</option>
                                <option value="4">4th Floor</option>
                                <option value="5">5th Floor</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Status
                            </label>
                            <select
                                value={formData.status_id}
                                onChange={(e) => setFormData({ ...formData, status_id: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                                <option value="1">Available</option>
                                <option value="2">Occupied</option>
                                <option value="3">Cleaning</option>
                                <option value="4">Maintenance</option>
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

                    {/* Amenities */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                            Amenities
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 1, name: 'WiFi' },
                                { id: 2, name: 'TV' },
                                { id: 3, name: 'AC' },
                                { id: 4, name: 'Mini Bar' },
                                { id: 5, name: 'Hot Water' },
                            ].map(amenity => (
                                <label key={amenity.id} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenity_ids.includes(amenity.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    amenity_ids: [...prev.amenity_ids, amenity.id]
                                                }));
                                            } else {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    amenity_ids: prev.amenity_ids.filter(id => id !== amenity.id)
                                                }));
                                            }
                                        }}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm text-slate-600">{amenity.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

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
                            className="flex-1 px-4 py-2.5 bg-[#002366] text-white rounded-lg font-medium hover:bg-[#001a47] transition-colors"
                        >
                            {mode === 'add' ? 'Add Room' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
