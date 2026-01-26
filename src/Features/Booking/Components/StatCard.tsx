import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: React.ComponentType<{ size: number }>;
    iconColor: 'royal' | 'golden';
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    trend,
    trendUp,
    icon: Icon,
    iconColor,
}) => {
    const bgGradient = iconColor === 'royal'
        ? 'from-[#1E3A8A] to-[#2563EB]'
        : 'from-[#D4AF37] to-[#F59E0B]';

    return (
        <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(30,58,138,0.08)] border border-slate-100 flex flex-col justify-between h-full transition-transform hover:scale-[1.02] duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-[#1E3A8A] text-2xl lg:text-3xl font-bold">{value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full bg-linear-to-br ${bgGradient} flex items-center justify-center text-white shadow-lg shadow-blue-900/10`}>
                    <Icon size={24} />
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-slate-400 text-xs">Updated just now</span>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border ${trendUp ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                    <TrendingUp size={12} className={!trendUp ? 'rotate-180' : ''} />
                    {trend}
                </div>
            </div>
        </div>
    );
};
