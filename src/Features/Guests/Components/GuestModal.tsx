import React from 'react';
import { X } from 'lucide-react';
import type { Guest } from '../../../Types/guest';

interface GuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    guest?: Guest;
}

export const GuestModal: React.FC<GuestModalProps> = ({
    isOpen,
    onClose,
    guest,
}) => {
    if (!isOpen || !guest) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 md:p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-lg md:text-xl font-bold text-[#002366]">
                        Guest Details
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 md:p-6 space-y-6">
                    {/* Read-only fields */}
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
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-slate-100 text-slate-800 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};