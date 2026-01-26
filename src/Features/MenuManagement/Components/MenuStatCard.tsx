import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MenuStatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    icon: React.ComponentType<{ size: number }>;
    iconColor: 'royal' | 'golden' | 'green' | 'purple';
}

export const MenuStatCard: React.FC<MenuStatCardProps> = ({
    title,
    value,
    trend,
    trendUp,
    icon: Icon,
    iconColor,
}) => {
    const colorMap = {
        royal: 'from-[#1E3A8A] to-[#2563EB]',
        golden: 'from-[#D4AF37] to-[#F59E0B]',
        green: 'from-[#10B981] to-[#059669]',
        purple: 'from-[#8B5CF6] to-[#7C3AED]',
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="text-slate-500 text-xs md:text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-[#1E3A8A] text-xl md:text-2xl font-bold">{value}</h3>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[iconColor]} flex items-center justify-center text-white shadow-md`}>
                    <Icon size={20} />
                </div>
            </div>

            {trend !== undefined && (
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                    <span className="text-slate-400 text-xs">Updated now</span>
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                        <TrendingUp size={10} className={!trendUp ? 'rotate-180' : ''} />
                        {trend}
                    </div>
                </div>
            )}
        </div>
    );
};
