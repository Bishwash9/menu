import React from 'react';


interface MenuStatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconColor: 'royal' | 'golden' | 'green' | 'purple';
}

export const MenuStatCard: React.FC<MenuStatCardProps> = ({
    title,
    value,
    icon,
    iconColor,
}) => {
    const colorMap = {
        royal: 'bg-blue-50 text-blue-500',
        golden: 'bg-orange-50 text-orange-500',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-500',
    };

    return (
        <div className="bg-white rounded-[1vw] p-[1.5vw] shadow-sm border border-slate-100 hover:shadow-md transition-all group flex items-center justify-between gap-[1.2vw]">
            <div className={`p-[0.7vw] rounded-lg shrink-0 ${colorMap[iconColor]} transition-all`}>
                {icon}
            </div>
            <div className="text-right flex-1 min-w-0">
                <p className="text-slate-400 text-[0.8vw] uppercase tracking-wider mb-[0.2vh] truncate">{title}</p>
                <h3 className="text-[2vw] font-light text-slate-700 leading-none mb-[0.5vh]">{value}</h3>

            </div>
        </div>
    );
};
