import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ReportStatCardProps {
    title: string;
    value: string;
    subtitle: string;
    change: number;
    icon?: React.ReactNode;
    iconBgColor?: string;
}

export const ReportStatCard: React.FC<ReportStatCardProps> = ({
    title,
    value,
    subtitle,
    change,
    icon,
    iconBgColor = 'bg-slate-100',
}) => {
    const isPositive = change >= 0;

    return (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
                {icon && (
                    <div className={`p-3 rounded-xl ${iconBgColor}`}>
                        {icon}
                    </div>
                )}
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    isPositive 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                }`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isPositive ? '+' : ''}{change}%
                </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        </div>
    );
};
