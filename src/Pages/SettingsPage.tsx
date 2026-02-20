import React, { useState } from 'react';
import {
    GeneralSettings,
    SecuritySettingsComponent,
    NotificationSettingsComponent,
    AppearanceSettingsComponent,
    SETTINGS_TABS,
    initialHotelInfo,
    initialNotificationSettings,
    initialSecuritySettings,
    initialAppearanceSettings,
} from '../Features/Settings';
import type { SettingsTab, HotelInfo, NotificationSettings, SecuritySettings, AppearanceSettings } from '../Features/Settings/Types';


const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');
    const [hotelInfo, setHotelInfo] = useState<HotelInfo>(initialHotelInfo);
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(initialNotificationSettings);
    const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(initialSecuritySettings);
    const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>(initialAppearanceSettings);

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <GeneralSettings
                        data={hotelInfo}
                        onChange={setHotelInfo}
                        onSave={handleSave}
                    />
                );
            case 'notifications':
                return (
                    <NotificationSettingsComponent
                        data={notificationSettings}
                        onChange={setNotificationSettings}
                        onSave={handleSave}
                    />
                );
            case 'security':
                return (
                    <SecuritySettingsComponent
                        data={securitySettings}
                        onChange={setSecuritySettings}
                        onSave={handleSave}
                    />
                );
            case 'appearance':
                return (
                    <AppearanceSettingsComponent
                        data={appearanceSettings}
                        onChange={setAppearanceSettings}
                        onSave={handleSave}
                    />
                );
            case 'integrations':
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-[#002366] mb-1">Integrations</h2>
                            <p className="text-sm text-slate-500">Connect third-party services</p>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Payment Gateway', 'SMS Service', 'Email Service', 'Channel Manager'].map(integration => (
                                    <div key={integration} className="p-4 border border-slate-200 rounded-lg flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-slate-800">{integration}</h4>
                                            <p className="text-sm text-slate-500">Not connected</p>
                                        </div>
                                        <button className="px-4 py-2 text-sm text-[#002366] border border-[#002366] rounded-lg hover:bg-[#002366]/5">
                                            Connect
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'backup':
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-[#002366] mb-1">Backup & Restore</h2>
                            <p className="text-sm text-slate-500">Manage your data backups</p>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-lg flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-slate-800">Automatic Backups</h4>
                                        <p className="text-sm text-slate-500">Daily at 2:00 AM</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Active</span>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2.5 bg-[#002366] text-white rounded-lg font-medium hover:bg-primary">
                                        Create Backup Now
                                    </button>
                                    <button className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">
                                        Restore from Backup
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'system':
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-[#002366] mb-1">System Information</h2>
                            <p className="text-sm text-slate-500">View system details and status</p>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="space-y-4">
                                {[
                                    { label: 'Version', value: '2.1.0' },
                                    { label: 'Last Updated', value: 'January 20, 2026' },
                                    { label: 'Database Status', value: 'Connected', status: 'success' },
                                    { label: 'Server Status', value: 'Online', status: 'success' },
                                    { label: 'Storage Used', value: '2.4 GB / 10 GB' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className={`font-medium ${item.status === 'success' ? 'text-green-600' : 'text-slate-800'}`}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 shrink-0">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {SETTINGS_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeTab === tab.id
                                ? 'bg-[#002366]/10 text-[#D4AF37] border-l-4 border-[#D4AF37]'
                                : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {renderContent()}
            </div>
        </div>
    );

};

export default SettingsPage;
