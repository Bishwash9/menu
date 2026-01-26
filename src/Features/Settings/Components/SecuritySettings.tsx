import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { SecuritySettings as SecuritySettingsType } from '../Types';

interface SecuritySettingsProps {
    data: SecuritySettingsType;
    onChange: (data: SecuritySettingsType) => void;
    onSave: () => void;
}

export const SecuritySettingsComponent: React.FC<SecuritySettingsProps> = ({
    data,
    onChange,
}) => {
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [passwords, setPasswords] = React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleToggle = (field: keyof SecuritySettingsType, value: boolean | number) => {
        onChange({ ...data, [field]: value });
    };

    const handlePasswordChange = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (passwords.newPassword.length < data.passwordMinLength) {
            alert(`Password must be at least ${data.passwordMinLength} characters!`);
            return;
        }
        alert('Password updated successfully!');
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#002366] mb-1">Security Settings</h2>
                <p className="text-sm text-slate-500">Manage your account security and authentication</p>
            </div>

            {/* Two Factor Auth */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-slate-800">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                    </div>
                    <button
                        onClick={() => handleToggle('twoFactorAuth', !data.twoFactorAuth)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                            data.twoFactorAuth ? 'bg-[#002366]' : 'bg-slate-300'
                        }`}
                    >
                        <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                data.twoFactorAuth ? 'left-7' : 'left-1'
                            }`}
                        />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Session Timeout (minutes)
                        </label>
                        <select
                            value={data.sessionTimeout}
                            onChange={(e) => handleToggle('sessionTimeout', Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] bg-white"
                        >
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Max Login Attempts
                        </label>
                        <input
                            type="number"
                            value={data.maxLoginAttempts}
                            onChange={(e) => handleToggle('maxLoginAttempts', Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                            min={3}
                            max={10}
                        />
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Change Password</h3>
                
                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Old Password
                        </label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={passwords.oldPassword}
                                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>
                    <button
                        onClick={handlePasswordChange}
                        className="px-6 py-2.5 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#b8962e] transition-colors"
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
};
