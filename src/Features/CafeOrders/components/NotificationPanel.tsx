import React from 'react';
import { Bell, X } from 'lucide-react';
import type { CafeNotification } from '../Types';

interface NotificationPanelProps {
    notifications: CafeNotification[];
    onDismiss?: (id: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
    notifications,
    onDismiss,
}) => {
    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'warning':
                return 'border-l-yellow-500 bg-yellow-50/50';
            case 'success':
                return 'border-l-green-500 bg-green-50/50';
            case 'info':
                return 'border-l-blue-500 bg-blue-50/50';
            default:
                return 'border-l-slate-400 bg-slate-50';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bell size={18} className="text-slate-500" />
                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                </div>
                <span className="px-2 py-0.5 bg-[#D4AF37] text-white text-xs font-semibold rounded-full">
                    {notifications.length} new
                </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-75 overflow-y-auto">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 border-l-4 ${getTypeStyles(notification.type)} hover:bg-slate-50 transition-colors`}
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-sm font-medium text-slate-700">{notification.message}</p>
                                <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                            </div>
                            <button
                                onClick={() => onDismiss?.(notification.id)}
                                className="p-1 hover:bg-slate-200 rounded transition-colors"
                            >
                                <X size={14} className="text-slate-400" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {notifications.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                    No new notifications
                </div>
            )}
        </div>
    );
};
