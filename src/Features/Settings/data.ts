import type { HotelInfo, NotificationSettings, SecuritySettings, AppearanceSettings, SettingsTab } from './Types';

export const SETTINGS_TABS: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'general', label: 'General Info', icon: '🏨' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'backup', label: 'Backup', icon: '💾' },
    { id: 'system', label: 'System', icon: '⚙️' },
];

export const CURRENCIES = ['NPR', 'INR', 'USD', 'EUR', 'GBP'];
export const TIMEZONES = ['Nepal (NPR)', 'India (IST)', 'UTC', 'US Eastern', 'US Pacific'];

export const initialHotelInfo: HotelInfo = {
    name: 'Namaste Hotel',
    email: 'admin@namastehotel.com',
    phone: '+977 12345 67890',
    currency: 'NPR',
    address: '123, Paradise Road, Kathmandu, Nepal, 400001',
    timezone: 'Nepal (NPR)',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    taxRate: 18,
    website: 'www.namastehotel.com',
};

export const initialNotificationSettings: NotificationSettings = {
    emailNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    paymentAlerts: true,
    systemAlerts: true,
    marketingEmails: false,
};

export const initialSecuritySettings: SecuritySettings = {
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
};

export const initialAppearanceSettings: AppearanceSettings = {
    theme: 'light',
    primaryColor: '#002366',
    compactMode: false,
    showAnimations: true,
};
