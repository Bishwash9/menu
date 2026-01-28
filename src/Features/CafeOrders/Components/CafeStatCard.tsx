import React from 'react';

interface CafeStatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBgColor: string;

}

export const CafeStatCard: React.FC<CafeStatCardProps> = ({
    title,
    value,
    icon,
    iconBgColor,

}) => {
    return (
        <div className="bg-white rounded-[1vw] p-[1.5vw] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex items-center justify-between gap-[1.2vw]">
            <div className={`p-[0.7vw] rounded-lg shrink-0 ${iconBgColor} transition-all`}>
                {icon}
            </div>
            <div className="text-right flex-1 min-w-0">
                <p className="text-[0.8vw] text-slate-400 uppercase tracking-wider mb-[0.2vh] truncate">{title}</p>
                <h3 className="text-[2vw] font-light text-slate-700 leading-none mb-[0.2vh]">{value}</h3>
            </div>
        </div>
    );
};
