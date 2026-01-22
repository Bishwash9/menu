import React, { useState } from 'react';
import { Search, Filter, Eye, MoreVertical } from 'lucide-react';
import type { CafeOrder, OrderStatus, OrderType } from '../Types';
import { ORDER_STATUSES, ORDER_TYPES } from '../data';

interface OrderTableProps {
    orders: CafeOrder[];
    onView?: (order: CafeOrder) => void;
    onEdit?: (order: CafeOrder) => void;
    onDelete?: (orderId: string) => void;
    onStatusChange?: (orderId: string, status: OrderStatus) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
    orders,
    onView,
    onEdit,
    onDelete,
    onStatusChange,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
    const [typeFilter, setTypeFilter] = useState<OrderType | 'All'>('All');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.tableNumber && order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchesType = typeFilter === 'All' || order.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Preparing': return 'bg-blue-100 text-blue-700';
            case 'Ready': return 'bg-purple-100 text-purple-700';
            case 'Served': return 'bg-green-100 text-green-700';
            case 'Completed': return 'bg-slate-100 text-slate-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'text-red-600';
            case 'High': return 'text-orange-600';
            case 'Normal': return 'text-slate-600';
            case 'Low': return 'text-slate-400';
            default: return 'text-slate-600';
        }
    };

    const getTypeIcon = (type: OrderType) => {
        switch (type) {
            case 'Dine In': return '🍽️';
            case 'Takeaway': return '🥡';
            case 'Room Service': return '🛎️';
            default: return '📦';
        }
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-3 items-end">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search orders by ID, table, or customer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                        <Filter size={18} className="text-slate-500" />
                    </button>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 bg-white"
                    >
                        <option value="All">All Status</option>
                        {ORDER_STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as any)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 bg-white"
                    >
                        <option value="All">All Types</option>
                        {ORDER_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Recent Orders Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-[#002366]">Recent Orders</h2>
                    <p className="text-sm text-slate-500">{filteredOrders.length} orders found</p>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                    🕐 Updated: {new Date().toLocaleTimeString()}
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Order ID</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Customer</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Type</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Items</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Total</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Status</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Priority</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Time</th>
                                <th className="px-4 py-3 text-center font-semibold text-slate-600 uppercase text-xs">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="w-8 h-8 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center text-xs">
                                                🧾
                                            </span>
                                            <span className="font-semibold text-slate-800">{order.orderNumber}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{order.customer}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <span>{getTypeIcon(order.type)}</span>
                                            <span className="text-slate-600">{order.type}</span>
                                            {order.tableNumber && (
                                                <span className="text-xs text-slate-400">({order.tableNumber})</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ').slice(0, 30)}
                                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ').length > 30 && '...'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-semibold text-[#D4AF37]">RS{order.total.toFixed(2)}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className={`px-4 py-3 font-medium ${getPriorityColor(order.priority)}`}>
                                        {order.priority}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">{formatTime(order.createdAt)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => onView?.(order)}
                                                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye size={16} className="text-slate-500" />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActiveMenu(activeMenu === order.id ? null : order.id)}
                                                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    <MoreVertical size={16} className="text-slate-500" />
                                                </button>
                                                {activeMenu === order.id && (
                                                    <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-35 z-10">
                                                        <button
                                                            onClick={() => { onEdit?.(order); setActiveMenu(null); }}
                                                            className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                                                        >
                                                            Edit Order
                                                        </button>
                                                        <div className="border-t border-slate-100 my-1"></div>
                                                        {ORDER_STATUSES.filter(s => s !== order.status).map(status => (
                                                            <button
                                                                key={status}
                                                                onClick={() => { onStatusChange?.(order.id, status); setActiveMenu(null); }}
                                                                className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                                                            >
                                                                Mark as {status}
                                                            </button>
                                                        ))}
                                                        <div className="border-t border-slate-100 my-1"></div>
                                                        <button
                                                            onClick={() => { 
                                                                if (confirm('Delete this order?')) onDelete?.(order.id); 
                                                                setActiveMenu(null); 
                                                            }}
                                                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                                        >
                                                            Delete Order
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p className="text-lg">No orders found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                </div>
            )}
        </div>
    );
};
