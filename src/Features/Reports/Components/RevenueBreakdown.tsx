import React from 'react';
import { MoreVertical } from 'lucide-react';
import type { CategoryRevenue } from '../Types';

interface RevenueBreakdownProps {
    data: CategoryRevenue[];
}

export const RevenueBreakdown: React.FC<RevenueBreakdownProps> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        🔄 Revenue Breakdown
                    </h3>
                    <p className="text-sm text-slate-500">By service category</p>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-slate-400" />
                </button>
            </div>

            <div className="space-y-4">
                {data.map((item, idx) => (
                    <div key={idx} className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                                style={{ backgroundColor: `${item.color}20` }}
                            >
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-700">{item.category}</span>
                                    <span className="font-bold text-slate-800">{item.percentage}%</span>
                                </div>
                                <p className="text-sm text-slate-500">
                                    RS{(item.amount / 1000).toFixed(0)},000
                                </p>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                                style={{ 
                                    width: `${item.percentage}%`,
                                    backgroundColor: item.color,
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
