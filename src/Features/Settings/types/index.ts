export type SettingsTab = 'general' | 'notifications' | 'security' | 'appearance' | 'integrations' | 'backup' | 'system';

export interface HotelInfo {
    name: string;
    email: string;
    phone: string;
    currency: string;
    address: string;
    timezone: string;
    checkInTime: string;
    checkOutTime: string;
    taxRate: number;
    website: string;
}

export interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    bookingAlerts: boolean;
    paymentAlerts: boolean;
    systemAlerts: boolean;
    marketingEmails: boolean;
}

export interface SecuritySettings {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
}

export interface AppearanceSettings {
    theme: 'light' | 'dark' | 'system';
    primaryColor: string;
    compactMode: boolean;
    showAnimations: boolean;
}
