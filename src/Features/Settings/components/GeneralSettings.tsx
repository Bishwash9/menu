import React from 'react';
import type { HotelInfo } from '../types';
import { CURRENCIES, TIMEZONES } from '../data';

interface GeneralSettingsProps {
    data: HotelInfo;
    onChange: (data: HotelInfo) => void;
    onSave: () => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
    data,
    onChange,
    onSave,
}) => {
    const handleChange = (field: keyof HotelInfo, value: string | number) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#002366] mb-1">Hotel Information</h2>
                <p className="text-sm text-slate-500">Manage your hotel's basic information</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
                        <select
                            value={data.currency}
                            onChange={(e) => handleChange('currency', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] bg-white"
                        >
                            {CURRENCIES.map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <textarea
                        value={data.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] resize-none"
                        rows={2}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                        <select
                            value={data.timezone}
                            onChange={(e) => handleChange('timezone', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] bg-white"
                        >
                            {TIMEZONES.map(tz => (
                                <option key={tz} value={tz}>{tz}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Check In Time</label>
                        <input
                            type="time"
                            value={data.checkInTime}
                            onChange={(e) => handleChange('checkInTime', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Check Out Time</label>
                        <input
                            type="time"
                            value={data.checkOutTime}
                            onChange={(e) => handleChange('checkOutTime', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tax Rate (%)</label>
                        <input
                            type="number"
                            value={data.taxRate}
                            onChange={(e) => handleChange('taxRate', Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                    <input
                        type="text"
                        value={data.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onSave}
                        className="px-6 py-2.5 bg-[#002366] text-white rounded-lg font-medium hover:bg-[#001a4d] transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
