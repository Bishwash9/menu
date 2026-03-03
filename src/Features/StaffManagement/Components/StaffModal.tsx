import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import type { Staff as Employee } from '../../../Types/staff';
import { staffService } from '../../../Services/staffService';
import { useAuth } from '../../../Context/AuthContext';

interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    staff?: Employee;
    onStaffAdded?: () => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({
    isOpen,
    onClose,
    staff,
    onStaffAdded
}) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: staff?.name || '',
        phone: staff?.phone || '',
        role: staff?.role?.toString() || '3',
        shift: staff?.shift?.toString() || '1',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isAddMode = !staff;

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

        if (!formData.name.trim() || !formData.phone.trim() || !formData.password.trim()) {
            setErrorMessage('Name, Phone, and Password are required');
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
                role: parseInt(formData.role),
                shift: parseInt(formData.shift),
                status: 1, // Default to active
                password: formData.password,
            };

            if (isAddMode) {
                await staffService.addStaff(user.business_id, payload);
                setSuccessMessage('Staff added successfully!');

                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    role: '3',
                    shift: '1',
                    password: '',
                });

                // Trigger refresh and close after delay
                setTimeout(() => {
                    onStaffAdded?.();
                    onClose();
                }, 1500);
            }
        } catch (error: any) {
            console.error('Error adding staff:', error);
            setErrorMessage(error?.response?.data?.message || error?.message || 'Failed to add staff');
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setFormData({
            name: staff?.name || '',
            phone: staff?.phone || '',
            role: staff?.role?.toString() || '3',
            shift: staff?.shift?.toString() || '1',
            password: '',
        });
        setErrorMessage('');
        setSuccessMessage('');
        onClose();
    };

    if (!isOpen) return null;

    // View mode for existing staff
    if (!isAddMode && staff) {
        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white p-4 md:p-6 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg md:text-xl font-bold text-[#002366]">
                            Staff Details
                        </h2>
                        <button onClick={handleModalClose} className="p-2 hover:bg-slate-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-4 md:p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                                <p className="text-lg font-medium text-slate-800">{staff.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                                <p className="text-lg font-medium text-slate-800">{staff.phone}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role</label>
                                <p className="text-lg font-medium text-slate-800">{staff.role_name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shift</label>
                                <p className="text-lg font-medium text-slate-800">{staff.shift_name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
                                <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
                                    {staff.status_name}
                                </span>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Joined</label>
                                <p className="text-lg font-medium text-slate-800">
                                    {new Date(staff.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business</label>
                                <p className="text-lg font-medium text-slate-800">{staff.business_name}</p>
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
                        Add New Staff
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
                                placeholder="Staff name"
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

                        {/* Role */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Role <span className="text-red-600">*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] text-slate-800"
                                disabled={loading}
                            >
                                <option value="3">Staff</option>
                                <option value="4">HouseKeeper</option>
                                <option value="5">Manager</option>
                                <option value="6">Reception</option>
                            </select>
                        </div>

                        {/* Shift */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Shift <span className="text-red-600">*</span>
                            </label>
                            <select
                                name="shift"
                                value={formData.shift}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] text-slate-800"
                                disabled={loading}
                            >
                                <option value="1">Day</option>
                                <option value="2">Night</option>
                                <option value="3">Evening</option>
                            </select>
                        </div>

                        {/* Password */}
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Password <span className="text-red-600">*</span>
                            </label>
                        <div className='relative'>

                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Set password for staff"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] text-slate-800"
                                disabled={loading}
                                />
                                <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-full transition-colors"
                                disabled={loading}>

                                    {showPassword ?(
                                        <Eye size={18} className="text-slate-500" />
                                        
                                    ) : (
                                        <EyeOff size={18} className="text-slate-500" />
                                    )}

                                </button>
                            </div>
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
                            {loading ? 'Adding...' : 'Add Staff'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};