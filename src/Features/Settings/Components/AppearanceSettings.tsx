import React from 'react';
import type { AppearanceSettings as AppearanceSettingsType } from '../Types';

interface AppearanceSettingsProps {
    data: AppearanceSettingsType;
    onChange: (data: AppearanceSettingsType) => void;
    onSave: () => void;
}

export const AppearanceSettingsComponent: React.FC<AppearanceSettingsProps> = ({
    data,
    onChange,
    onSave,
}) => {
    const themes = [
        { id: 'light', label: 'Light', icon: '☀️' },
        { id: 'dark', label: 'Dark', icon: '🌙' },
        { id: 'system', label: 'System', icon: '💻' },
    ];

    const colors = [
        { name: 'Royal Blue', value: '#002366' },
        { name: 'Navy', value: '#1E3A8A' },
        { name: 'Emerald', value: '#059669' },
        { name: 'Purple', value: '#7C3AED' },
        { name: 'Rose', value: '#E11D48' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#002366] mb-1">Appearance Settings</h2>
                <p className="text-sm text-slate-500">Customize the look and feel of your dashboard</p>
            </div>

            {/* Theme Selection */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Theme</h3>
                <div className="flex gap-4">
                    {themes.map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => onChange({ ...data, theme: theme.id as any })}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                                data.theme === theme.id
                                    ? 'border-[#002366] bg-[#002366]/5'
                                    : 'border-slate-200 hover:border-slate-300'
                            }`}
                        >
                            <span className="text-2xl block mb-2">{theme.icon}</span>
                            <span className="font-medium text-slate-700">{theme.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Primary Color */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Primary Color</h3>
                <div className="flex gap-3">
                    {colors.map(color => (
                        <button
                            key={color.value}
                            onClick={() => onChange({ ...data, primaryColor: color.value })}
                            className={`w-12 h-12 rounded-xl transition-transform hover:scale-110 ${
                                data.primaryColor === color.value 
                                    ? 'ring-2 ring-offset-2 ring-slate-400' 
                                    : ''
                            }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            {/* Other Options */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Display Options</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                            <h4 className="font-medium text-slate-800">Compact Mode</h4>
                            <p className="text-sm text-slate-500">Reduce spacing for more content</p>
                        </div>
                        <button
                            onClick={() => onChange({ ...data, compactMode: !data.compactMode })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                                data.compactMode ? 'bg-[#002366]' : 'bg-slate-300'
                            }`}
                        >
                            <span
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                    data.compactMode ? 'left-7' : 'left-1'
                                }`}
                            />
                        </button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <h4 className="font-medium text-slate-800">Show Animations</h4>
                            <p className="text-sm text-slate-500">Enable smooth transitions and effects</p>
                        </div>
                        <button
                            onClick={() => onChange({ ...data, showAnimations: !data.showAnimations })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                                data.showAnimations ? 'bg-[#002366]' : 'bg-slate-300'
                            }`}
                        >
                            <span
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                    data.showAnimations ? 'left-7' : 'left-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onSave}
                    className="px-6 py-2.5 bg-[#002366] text-white rounded-lg font-medium hover:bg-[#001a4d] transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};
