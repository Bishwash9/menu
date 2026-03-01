import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Guest } from '../../../Types/guest';
import { guestService } from '../../../Services/guestService';
import { useAuth } from '../../../Context/AuthContext';

interface GuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    guest?: Guest;
    onGuestAdded?: () => void;
}

export const GuestModal: React.FC<GuestModalProps> = ({
    isOpen,
    onClose,
    guest,
    onGuestAdded,
}) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: guest?.name || '',
        phone: guest?.phone || '',
        verify_id: guest?.verify_id?.toString() || '',
        status_id: guest?.status_id?.toString() || '1',
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isAddMode = !guest;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!formData.name.trim() || !formData.phone.trim()) {
            setErrorMessage('Name and Phone are required');
            return;
        }

        if (!user?.business_id) {
            setErrorMessage('Business ID not found');
            return;
        }

        try {
            setLoading(true);

            const payload = {
                name: formData.name,
                phone: formData.phone,
                verify_id: parseInt(formData.verify_id) || 0,
                status_id: parseInt(formData.status_id),
            };

            if (isAddMode) {
                await guestService.addGuest(user.business_id, payload);
                setSuccessMessage('Guest added successfully!');
                
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    verify_id: '',
                    status_id: '1',
                });

                // Trigger refresh and close after delay
                setTimeout(() => {
                    onGuestAdded?.();
                    onClose();
                }, 2000);
            }
        } catch (error: any) {
            console.error('Error adding guest:', error);
            setErrorMessage(error?.response?.data?.message || error?.message || 'Failed to add guest');
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setFormData({
            name: guest?.name || '',
            phone: guest?.phone || '',
            verify_id: guest?.verify_id?.toString() || '',
            status_id: guest?.status_id?.toString() || '1', //default to checked in
        });
        setErrorMessage('');
        setSuccessMessage('');
        onClose();
    };

    if (!isOpen) return null;

    // View mode for existing guest
    if (!isAddMode && guest) {
        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white p-4 md:p-6 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg md:text-xl font-bold text-[#002366]">
                            Guest Details
                        </h2>
                        <button onClick={handleModalClose} className="p-2 hover:bg-slate-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-4 md:p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                                <p className="text-lg font-medium text-slate-800">{guest.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                                <p className="text-lg font-medium text-slate-800">{guest.phone}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ID Type</label>
                                <p className="text-lg font-medium text-slate-800">{guest.verify_name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
                                <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
                                    {guest.status_name}
                                </span>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Checked In</label>
                                <p className="text-lg font-medium text-slate-800">
                                    {new Date(guest.created_at).toLocaleDateString()} at {new Date(guest.created_at).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-200">
                            <button
                                onClick={handleModalClose}
                                className="flex-1 px-4 py-2 bg-slate-100 text-slate-800 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Add mode form
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 md:p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-lg md:text-xl font-bold text-[#002366]">
                        Add New Guest
                    </h2>
                    <button onClick={handleModalClose} className="p-2 hover:bg-slate-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm font-semibold text-red-800">{errorMessage}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm font-semibold text-green-800">{successMessage}</p>
                        </div>
                    )}

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Guest name"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] text-slate-800"
                                disabled={loading}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Phone <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone number"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] text-slate-800"
                                disabled={loading}
                            />
                        </div>

                        {/* ID Type */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                ID Type
                            </label>
                            <input
                                type="text"
                                name="verify_id"
                                value={formData.verify_id}
                                onChange={handleChange}
                                placeholder="e.g., Passport, License"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] text-slate-800"
                                disabled={loading}
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Status
                            </label>
                            <select
                                name="status_id"
                                value={formData.status_id}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] text-slate-800"
                                disabled={loading}
                            >
                                <option value="1">Checked In</option>
                                <option value="2">Checked Out</option>
                                
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={handleModalClose}
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-slate-100 text-slate-800 font-bold rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-[#002366] text-white font-bold rounded-lg hover:bg-[#001a47] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Adding...' : 'Add Guest'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};