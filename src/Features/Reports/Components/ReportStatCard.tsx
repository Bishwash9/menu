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
        <div className="bg-white rounded-[1vw] p-[1.5vw] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex items-center justify-between gap-[1.2vw]">
            {icon && (
                <div className={`p-[0.7vw] rounded-lg shrink-0 ${iconBgColor} transition-all`}>
                    {icon}
                </div>
            )}
            <div className="text-right flex-1 min-w-0">
                <p className="text-[0.8vw] text-slate-400 uppercase tracking-wider mb-[0.2vh] truncate">{title}</p>
                <h3 className="text-[2vw] font-light text-slate-700 leading-none mb-[0.2vh]">{value}</h3>
                <p className="text-[0.7vw] text-slate-400 mb-[0.5vh]">{subtitle}</p>
                <span className={`inline-flex items-center gap-[0.2vw] text-[0.7vw] font-semibold px-[0.5vw] py-[0.2vh] rounded-full ${isPositive
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                    }`}>
                    {isPositive ? <TrendingUp size={10} className="w-[0.7vw] h-[0.7vw]" /> : <TrendingDown size={10} className="w-[0.7vw] h-[0.7vw]" />}
                    {isPositive ? '+' : ''}{change}%
                </span>
            </div>
        </div>
    );
};
