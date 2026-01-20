import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Guest, GuestStatus } from '../types';
import { GUEST_STATUSES, ID_TYPES, NATIONALITIES } from '../data';

interface GuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (guest: Omit<Guest, 'id'> | Guest) => void;
    guest?: Guest | null;
    mode: 'add' | 'edit';
}

export const GuestModal: React.FC<GuestModalProps> = ({
    isOpen,
    onClose,
    onSave,
    guest,
    mode,
}) => {
    const [formData, setFormData] = useState<Omit<Guest, 'id'>>({
        name: '',
        email: '',
        phone: '',
        status: 'Reserved',
        totalStays: 0,
        totalSpent: 0,
        idType: 'Passport',
        idNumber: '',
        nationality: 'Nepal',
    });

    useEffect(() => {
        if (guest && mode === 'edit') {
            setFormData({
                name: guest.name,
                email: guest.email,
                phone: guest.phone,
                roomNumber: guest.roomNumber,
                status: guest.status,
                checkIn: guest.checkIn,
                checkOut: guest.checkOut,
                totalStays: guest.totalStays,
                totalSpent: guest.totalSpent,
                idType: guest.idType,
                idNumber: guest.idNumber,
                nationality: guest.nationality,
                address: guest.address,
                notes: guest.notes,
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                status: 'Reserved',
                totalStays: 0,
                totalSpent: 0,
                idType: 'Passport',
                idNumber: '',
                nationality: 'Nepal',
            });
        }
    }, [guest, mode, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && guest) {
            onSave({ ...formData, id: guest.id });
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
                        {mode === 'add' ? 'Add New Guest' : 'Edit Guest'}
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
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Phone *
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                ID Type
                            </label>
                            <select
                                value={formData.idType}
                                onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] bg-white"
                            >
                                {ID_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                ID Number
                            </label>
                            <input
                                type="text"
                                value={formData.idNumber}
                                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Nationality
                            </label>
                            <select
                                value={formData.nationality}
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] bg-white"
                            >
                                {NATIONALITIES.map(nat => (
                                    <option key={nat} value={nat}>{nat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as GuestStatus })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] bg-white"
                            >
                                {GUEST_STATUSES.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Room Number
                            </label>
                            <input
                                type="text"
                                value={formData.roomNumber || ''}
                                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                                placeholder="e.g., 201"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Check In
                            </label>
                            <input
                                type="date"
                                value={formData.checkIn || ''}
                                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Notes
                        </label>
                        <textarea
                            value={formData.notes || ''}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] resize-none"
                            rows={2}
                            placeholder="Special requests, preferences..."
                        />
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
                            className="flex-1 px-4 py-2.5 bg-[#002366] text-white rounded-lg font-medium hover:bg-[#001a4d] transition-colors"
                        >
                            {mode === 'add' ? 'Add Guest' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
