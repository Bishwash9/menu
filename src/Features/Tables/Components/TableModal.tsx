import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Table, TableStatus, TableArea } from '../Types';
import { TABLE_STATUSES, TABLE_AREAS } from '../data';

interface TableModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (table: Omit<Table, 'id'> | Table) => void;
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
    const [formData, setFormData] = useState<Omit<Table, 'id'>>({
        tableNumber: '',
        area: 'Main Hall',
        status: 'Available',
        seats: 4,
    });

    useEffect(() => {
        if (table && mode === 'edit') {
            setFormData({
                tableNumber: table.tableNumber,
                area: table.area,
                status: table.status,
                seats: table.seats,
                currentOrder: table.currentOrder,
            });
        } else {
            setFormData({
                tableNumber: '',
                area: 'Main Hall',
                status: 'Available',
                seats: 4,
            });
        }
    }, [table, mode, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && table) {
            onSave({ ...formData, id: table.id });
        } else {
            onSave(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-[#002366]">
                        {mode === 'add' ? 'Add New Table' : 'Edit Table'}
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
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Table Number *
                        </label>
                        <input
                            type="text"
                            value={formData.tableNumber}
                            onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                            placeholder="e.g., T1, T2"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Area *
                            </label>
                            <select
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value as TableArea })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            >
                                {TABLE_AREAS.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Seats *
                            </label>
                            <input
                                type="number"
                                value={formData.seats}
                                onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                                min="1"
                                max="20"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as TableStatus })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        >
                            {TABLE_STATUSES.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
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
                            {mode === 'add' ? 'Add Table' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
