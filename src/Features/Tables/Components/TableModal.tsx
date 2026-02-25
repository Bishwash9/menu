import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Table } from '../../../Types/table';

// These should match your Backend's expected strings
const LOCATIONS = ['Main Hall', 'Garden', 'Rooftop', 'Private'];
const STATUSES = ['Available', 'Occupied', 'Reserved', 'Cleaning'];

interface TableModalProps {
    isOpen: boolean;
    onClose: () => void;
    // We make onSave async so we can show the loading spinner until the API responds
    onSave: (table: any) => Promise<void>;
    table?: Table | null;
    mode: 'add' | 'edit';
}

export const TableModal: React.FC<TableModalProps> = ({
    isOpen,
    onClose,
    onSave,
    table,
    mode,
}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        table_number: '',
        location: 'Main Hall',
        status_name: 'Available',
        seats: 4,
    });

    // Reset or populate form when modal opens or table changes
    useEffect(() => {
        if (table && mode === 'edit') {
            setFormData({
                table_number: table.table_number.toString(),
                location: table.location,
                status_name: table.status_name,
                seats: table.seats,
            });
        } else {
            setFormData({
                table_number: '',
                location: 'Main Hall',
                status_name: 'Available',
                seats: 4,
            });
        }
    }, [table, mode, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare payload
            const payload = {
                ...formData,
                table_number: parseInt(formData.table_number),
                id: table?.id // Include ID if we are editing
            };

            await onSave(payload);
            onClose(); // Only close on success
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-bold text-[#002366]">
                        {mode === 'add' ? 'Add New Table' : 'Update Table Details'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:shadow-md rounded-full transition-all text-slate-400 hover:text-red-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Table Number */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                            Table Number / Label
                        </label>
                        <input
                            type="text"
                            value={formData.table_number}
                            onChange={(e) => setFormData({ ...formData, table_number: e.target.value })}
                            placeholder="e.g. 101 or T1"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002366]/10 focus:border-[#002366] transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Location/Area */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                                Location
                            </label>
                            <select
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002366]/10 focus:border-[#002366] appearance-none"
                            >
                                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                                Seats
                            </label>
                            <input
                                type="number"
                                value={formData.seats}
                                onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002366]/10 focus:border-[#002366]"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    {/* Status Selection */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                            Current Status
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {STATUSES.map(status => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, status_name: status })}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                                        formData.status_name === status
                                            ? 'bg-[#002366] text-white border-[#002366] shadow-sm'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#002366]/30'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-blue-900/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:bg-slate-400"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                mode === 'add' ? 'Create Table' : 'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
