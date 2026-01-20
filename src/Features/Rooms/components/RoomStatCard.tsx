import React from 'react';

interface RoomStatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    iconBgColor?: string;
    valueColor?: string;
}

export const RoomStatCard: React.FC<RoomStatCardProps> = ({
    title,
    value,
    icon,
    iconBgColor = 'bg-[#002366]/10',
    valueColor = 'text-slate-800',
}) => {
    return (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 font-medium">{title}</p>
                    <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${iconBgColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};
