import React from 'react';

interface CafeStatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    iconBgColor: string;
    change?: string;
    changeType?: 'positive' | 'negative';
}

export const CafeStatCard: React.FC<CafeStatCardProps> = ({
    title,
    value,
    subtitle,
    icon,
    iconBgColor,
    change,
    changeType,
}) => {
    return (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${iconBgColor}`}>
                    {icon}
                </div>
                {change && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        changeType === 'positive' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                    }`}>
                        {changeType === 'positive' ? '+' : ''}{change}
                    </span>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                <p className="text-sm text-slate-500 font-medium">{title}</p>
            </div>
            <p className="text-xs text-slate-400 mt-2">{subtitle}</p>
        </div>
    );
};
