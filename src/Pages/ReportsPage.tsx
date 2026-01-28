import React, { useState } from 'react';
import { Download, ChevronDown, TrendingUp, Percent, Wallet, PiggyBank } from 'lucide-react';
import { SideBar } from '../Components/Layout/Sidebar';
import {
    ReportStatCard,
    RevenueChart,
    RevenueBreakdown,
    TopRoomsTable,
    TIME_FILTERS,
    monthlyRevenueData,
    categoryRevenue,
    initialStats,
    topPerformingRooms,
} from '../Features/Reports';
import type { TimeFilter } from '../Features/Reports/Types';

const ReportsPage: React.FC = () => {
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('This Month');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const stats = initialStats;

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <SideBar />

            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200"></div>

                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#002366]">Hotel Analytics Dashboard</h1>
                            <p className="text-slate-500">Real-time insights and performance metrics</p>
                        </div>
                        <div className="flex gap-3">
                            {/* Time Filter Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                                >
                                    {timeFilter}
                                    <ChevronDown size={16} />
                                </button>
                                {showFilterDropdown && (
                                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-37.5 z-10">
                                        {TIME_FILTERS.map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => {
                                                    setTimeFilter(filter as TimeFilter);
                                                    setShowFilterDropdown(false);
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm transition-colors ${timeFilter === filter
                                                        ? 'bg-[#002366]/10 text-[#002366] font-medium'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    const reportData = `Hotel Analytics Report\nGenerated: ${new Date().toLocaleString()}\n\nTime Period: ${timeFilter}\n\nKey Metrics:\nTotal Revenue: Rs. ${stats.totalRevenue}\nOccupancy Rate: ${stats.occupancyRate}%\nTotal Expenses: Rs. ${stats.totalExpenses}\nNet Profit: Rs. ${stats.netProfit}\n\nRevenue Change: ${stats.revenueChange}%\nOccupancy Change: ${stats.occupancyChange}%\nProfit Change: ${stats.profitChange}%`;
                                    const blob = new Blob([reportData], { type: 'text/plain' });
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `hotel_report_${new Date().toISOString().split('T')[0]}.txt`;
                                    a.click();
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#b8962e] transition-colors shadow-sm"
                            >
                                <Download size={18} />
                                Export Report
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <ReportStatCard
                            title="Total Revenue"
                            value={`Rs. ${(stats.totalRevenue / 100000).toFixed(2)}L`}
                            subtitle="This month"
                            change={stats.revenueChange}
                            icon={<TrendingUp size={24} className="text-[#002366]" />}
                            iconBgColor="bg-[#002366]/10"
                        />
                        <ReportStatCard
                            title="Occupancy Rate"
                            value={`${stats.occupancyRate}%`}
                            subtitle="Average daily"
                            change={stats.occupancyChange}
                            icon={<Percent size={24} className="text-green-600" />}
                            iconBgColor="bg-green-100"
                        />
                        <ReportStatCard
                            title="Total Expenses"
                            value={`Rs. ${(stats.totalExpenses / 100000).toFixed(2)}L`}
                            subtitle="This month"
                            change={stats.expensesChange}
                            icon={<Wallet size={24} className="text-red-500" />}
                            iconBgColor="bg-red-100"
                        />
                        <ReportStatCard
                            title="Net Profit"
                            value={`Rs. ${(stats.netProfit / 100000).toFixed(2)}L`}
                            subtitle={`Net margin ${Math.round((stats.netProfit / stats.totalRevenue) * 100)}%`}
                            change={stats.profitChange}
                            icon={<PiggyBank size={24} className="text-[#D4AF37]" />}
                            iconBgColor="bg-[#D4AF37]/20"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <RevenueChart data={monthlyRevenueData} />
                        <RevenueBreakdown data={categoryRevenue} />
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TopRoomsTable data={topPerformingRooms} />

                        {/* Performance Metrics */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                📈 Performance Metrics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Average Daily Rate (ADR)</span>
                                    <span className="font-bold text-[#002366]">Rs. 2,850</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">RevPAR</span>
                                    <span className="font-bold text-[#002366]">Rs. 2,223</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Guest Satisfaction</span>
                                    <span className="font-bold text-green-600">4.7/5</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Return Guests</span>
                                    <span className="font-bold text-[#D4AF37]">32%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReportsPage;
