import React, { useState } from 'react';
import { Plus, Shield, Users, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { SideBar } from '../Components/Layout/Sidebar';
import { RoleModal, initialRoles, allPermissions } from '../Features/RolesAccess';
import type { Role } from '../Features/RolesAccess/Types';
import { DashboardHeader } from '../Components/Layout';

const RolesAccessPage: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>(initialRoles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const handleAddRole = () => {
        setModalMode('add');
        setSelectedRole(null);
        setIsModalOpen(true);
    };

    const handleEditRole = (role: Role) => {
        setModalMode('edit');
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const handleDeleteRole = (roleId: string) => {
        if (confirm('Are you sure you want to delete this role?')) {
            setRoles(roles.filter(r => r.id !== roleId));
        }
    };

    const handleSaveRole = (roleData: any) => {
        if (roleData.id) {
            setRoles(roles.map(r => r.id === roleData.id ? roleData : r));
        } else {
            const newRole: Role = {
                ...roleData,
                id: Date.now().toString(),
                usersCount: 0,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setRoles([...roles, newRole]);
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <SideBar/>
            
            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200">
                     <DashboardHeader/>
                </div>
                
                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    
                        <button
                            onClick={handleAddRole}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#b8962e] transition-colors shadow-sm"
                        >
                            <Plus size={18} />
                            Create Role
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#002366]/10 rounded-xl">
                                    <Shield size={24} className="text-[#002366]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-800">{roles.length}</p>
                                    <p className="text-sm text-slate-500">Total Roles</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#D4AF37]/20 rounded-xl">
                                    <Users size={24} className="text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-800">
                                        {roles.reduce((sum, r) => sum + r.usersCount, 0)}
                                    </p>
                                    <p className="text-sm text-slate-500">Users Assigned</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Shield size={24} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-800">{allPermissions.length}</p>
                                    <p className="text-sm text-slate-500">Permissions</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Roles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {roles.map(role => (
                            <div 
                                key={role.id} 
                                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                            >
                                <div 
                                    className="h-2" 
                                    style={{ backgroundColor: role.color }}
                                ></div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-lg text-slate-800">{role.name}</h3>
                                            <p className="text-sm text-slate-500">{role.description}</p>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={() => setActiveMenu(activeMenu === role.id ? null : role.id)}
                                                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                                            >
                                                <MoreVertical size={16} className="text-slate-400" />
                                            </button>
                                            {activeMenu === role.id && (
                                                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-25 z-10">
                                                    <button
                                                        onClick={() => { handleEditRole(role); setActiveMenu(null); }}
                                                        className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                                    >
                                                        <Edit2 size={14} /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => { handleDeleteRole(role.id); setActiveMenu(null); }}
                                                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 size={14} /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                            <Users size={14} className="text-slate-400" />
                                            {role.usersCount} users
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                            <Shield size={14} className="text-slate-400" />
                                            {role.permissions.length} permissions
                                        </div>
                                    </div>

                                    {/* Permission Preview */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {role.permissions.slice(0, 4).map(permId => {
                                            const perm = allPermissions.find(p => p.id === permId);
                                            return perm ? (
                                                <span
                                                    key={permId}
                                                    className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded"
                                                >
                                                    {perm.module}
                                                </span>
                                            ) : null;
                                        })}
                                        {role.permissions.length > 4 && (
                                            <span className="px-2 py-0.5 text-xs bg-[#002366]/10 text-[#002366] rounded">
                                                +{role.permissions.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add Role Card */}
                        <div
                            onClick={handleAddRole}
                            className="bg-white rounded-xl border-2 border-dashed border-slate-300 hover:border-[#002366] cursor-pointer p-5 flex flex-col items-center justify-center min-h-50 transition-all hover:shadow-md"
                        >
                            <Plus size={32} className="text-slate-400 mb-2" />
                            <span className="font-medium text-slate-500">Create New Role</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal */}
            <RoleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRole}
                role={selectedRole}
                mode={modalMode}
            />
        </div>
    );
};

export default RolesAccessPage;
