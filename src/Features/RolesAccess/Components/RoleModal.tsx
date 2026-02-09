import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import type { Role } from '../Types';
import { allPermissions, PERMISSION_MODULES } from '../data';

interface RoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (role: Omit<Role, 'id' | 'createdAt' | 'usersCount'> | Role) => void;
    role?: Role | null;
    mode: 'add' | 'edit';
}

const COLORS = ['#002366', '#D4AF37', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'];

export const RoleModal: React.FC<RoleModalProps> = ({
    isOpen,
    onClose,
    onSave,
    role,
    mode,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        permissions: [] as string[],
        color: '#002366',
    });

    useEffect(() => {
        if (role && mode === 'edit') {
            setFormData({
                name: role.name,
                description: role.description,
                permissions: role.permissions,
                color: role.color,
            });
        } else {
            setFormData({
                name: '',
                description: '',
                permissions: [],
                color: '#002366',
            });
        }
    }, [role, mode, isOpen]);

    const togglePermission = (permissionId: string) => {
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permissionId)
                ? prev.permissions.filter(p => p !== permissionId)
                : [...prev.permissions, permissionId],
        }));
    };

    const toggleModule = (module: string) => {
        const modulePermissions = allPermissions
            .filter(p => p.module === module)
            .map(p => p.id);
        
        const allSelected = modulePermissions.every(p => formData.permissions.includes(p));
        
        if (allSelected) {
            setFormData(prev => ({
                ...prev,
                permissions: prev.permissions.filter(p => !modulePermissions.includes(p)),
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                permissions: [...new Set([...prev.permissions, ...modulePermissions])],
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && role) {
            onSave({ ...formData, id: role.id, createdAt: role.createdAt, usersCount: role.usersCount });
        } else {
            onSave(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
                    <h2 className="text-xl font-bold text-[#002366]">
                        {mode === 'add' ? 'Create New Role' : 'Edit Role'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Role Name *
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
                                Color
                            </label>
                            <div className="flex gap-2">
                                {COLORS.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, color })}
                                        className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 ${
                                            formData.color === color ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief description of this role..."
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>

                    {/* Permissions */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                            Permissions
                        </label>
                        <div className="space-y-4 max-h-75 overflow-y-auto border border-slate-200 rounded-lg p-4">
                            {PERMISSION_MODULES.map(module => {
                                const modulePermissions = allPermissions.filter(p => p.module === module);
                                const selectedCount = modulePermissions.filter(p => formData.permissions.includes(p.id)).length;
                                const allSelected = selectedCount === modulePermissions.length;
                                
                                return (
                                    <div key={module} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                        <div 
                                            className="flex items-center gap-2 mb-2 cursor-pointer"
                                            onClick={() => toggleModule(module)}
                                        >
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                                allSelected 
                                                    ? 'bg-[#002366] border-[#002366]' 
                                                    : selectedCount > 0 
                                                        ? 'bg-[#002366]/50 border-[#002366]/50'
                                                        : 'border-slate-300'
                                            }`}>
                                                {(allSelected || selectedCount > 0) && (
                                                    <Check size={12} className="text-white" />
                                                )}
                                            </div>
                                            <span className="font-medium text-slate-800">{module}</span>
                                            <span className="text-xs text-slate-400">
                                                ({selectedCount}/{modulePermissions.length})
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 ml-7">
                                            {modulePermissions.map(permission => (
                                                <label
                                                    key={permission.id}
                                                    className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-800"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.permissions.includes(permission.id)}
                                                        onChange={() => togglePermission(permission.id)}
                                                        className="rounded border-slate-300 text-[#002366] focus:ring-[#002366]/20"
                                                    />
                                                    {permission.name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
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
                            className="flex-1 px-4 py-2.5 bg-dashboard-primary text-white rounded-lg font-medium hover:bg-dashboard-primary transition-colors"
                        >
                            {mode === 'add' ? 'Create Role' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
