import React from 'react';
import type { NotificationSettings as NotificationSettingsType } from '../Types';

interface NotificationSettingsProps {
    data: NotificationSettingsType;
    onChange: (data: NotificationSettingsType) => void;
    onSave: () => void;
}

interface ToggleSwitchProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
        <div>
            <h4 className="font-medium text-slate-800">{label}</h4>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
                checked ? 'bg-[#002366]' : 'bg-slate-300'
            }`}
        >
            <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    checked ? 'left-7' : 'left-1'
                }`}
            />
        </button>
    </div>
);

export const NotificationSettingsComponent: React.FC<NotificationSettingsProps> = ({
    data,
    onChange,
    onSave,
}) => {
    const handleToggle = (field: keyof NotificationSettingsType) => {
        onChange({ ...data, [field]: !data[field] });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#002366] mb-1">Notification Preferences</h2>
                <p className="text-sm text-slate-500">Manage how you receive notifications</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Email & SMS</h3>
                <ToggleSwitch
                    label="Email Notifications"
                    description="Receive important updates via email"
                    checked={data.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                />
                <ToggleSwitch
                    label="SMS Notifications"
                    description="Receive urgent alerts via SMS"
                    checked={data.smsNotifications}
                    onChange={() => handleToggle('smsNotifications')}
                />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Alert Types</h3>
                <ToggleSwitch
                    label="Booking Alerts"
                    description="Get notified about new bookings and cancellations"
                    checked={data.bookingAlerts}
                    onChange={() => handleToggle('bookingAlerts')}
                />
                <ToggleSwitch
                    label="Payment Alerts"
                    description="Receive payment confirmations and reminders"
                    checked={data.paymentAlerts}
                    onChange={() => handleToggle('paymentAlerts')}
                />
                <ToggleSwitch
                    label="System Alerts"
                    description="Important system updates and maintenance notifications"
                    checked={data.systemAlerts}
                    onChange={() => handleToggle('systemAlerts')}
                />
                <ToggleSwitch
                    label="Marketing Emails"
                    description="Promotional offers and newsletters"
                    checked={data.marketingEmails}
                    onChange={() => handleToggle('marketingEmails')}
                />
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onSave}
                    className="px-6 py-2.5 bg-[#002366] text-white rounded-lg font-medium hover:bg-[#001a4d] transition-colors"
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};
