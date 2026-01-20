import React from 'react';
import { MoreVertical } from 'lucide-react';
import type { RevenueData } from '../types';

interface RevenueChartProps {
    data: RevenueData[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.flatMap(d => [d.thisYear, d.lastYear]));

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        📊 Revenue Trends
                    </h3>
                    <p className="text-sm text-slate-500">Monthly revenue comparison</p>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-slate-400" />
                </button>
            </div>

            {/* Chart */}
            <div className="relative h-64">
                {/* Y-axis grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="border-b border-dashed border-slate-100"></div>
                    ))}
                </div>

                {/* Bars */}
                <div className="relative h-full flex items-end justify-between gap-2 px-2">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex items-end justify-center gap-1 h-52">
                                {/* This Year Bar */}
                                <div
                                    className="w-3 bg-[#002366] rounded-t transition-all hover:bg-[#003399]"
                                    style={{ height: `${(item.thisYear / maxValue) * 100}%` }}
                                    title={`This Year: RS${(item.thisYear / 100000).toFixed(1)}L`}
                                ></div>
                                {/* Last Year Bar */}
                                <div
                                    className="w-3 bg-slate-300 rounded-t transition-all hover:bg-slate-400"
                                    style={{ height: `${(item.lastYear / maxValue) * 100}%` }}
                                    title={`Last Year: RS${(item.lastYear / 100000).toFixed(1)}L`}
                                ></div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{item.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#002366] rounded"></span>
                    <span className="text-sm text-slate-600">This Year</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-slate-300 rounded"></span>
                    <span className="text-sm text-slate-600">Last Year</span>
                </div>
            </div>
        </div>
    );
};
