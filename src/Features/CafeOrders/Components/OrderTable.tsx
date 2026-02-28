import React, { useState } from 'react';
import { Search, Eye, RefreshCw } from 'lucide-react';
import type { Order } from '../../../Types/order';

interface OrderTableProps {
    orders: Order[];
    onView?: (order: Order) => void;
    onRefresh?: () => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
    orders,
    onView,
    onRefresh,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [typeFilter, setTypeFilter] = useState<string>('All');

    // Get unique statuses and types from actual orders data
    const statuses = Array.from(new Set(orders.map(o => o.status_name)));
    const orderTypes = Array.from(new Set(orders.map(o => o.order_type_name)));

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.table_number && order.table_number.toString().includes(searchQuery));
        const matchesStatus = statusFilter === 'All' || order.status_name === statusFilter;
        const matchesType = typeFilter === 'All' || order.order_type_name === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-700';
        if (statusLower.includes('preparing')) return 'bg-blue-100 text-blue-700';
        if (statusLower.includes('ready')) return 'bg-purple-100 text-purple-700';
        if (statusLower.includes('served')) return 'bg-green-100 text-green-700';
        if (statusLower.includes('complete')) return 'bg-green-100 text-slate-700';
        if (statusLower.includes('cancel')) return 'bg-red-100 text-red-700';
        return 'bg-slate-100 text-slate-600';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };


    return (
        <div className="w-full">
            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-3 items-end mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by order number, business, or table..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            className="px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                            title="Refresh orders"
                        >
                            <RefreshCw size={18} />
                        </button>
                    )}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 bg-white"
                    >
                        <option value="All">All Status</option>
                        {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 bg-white"
                    >
                        <option value="All">All Types</option>
                        {orderTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Order #</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Table/Room</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Items</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>




                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium text-slate-900">#{order.order_number}</td>
                                        <td className="px-4 py-3 text-sm text-slate-600">{order.order_type_name}</td>
                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {order.is_room_order ? `Room ${order.room_id}` : `Table ${order.table_number || order.table_id}`}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">{order.items.length} items</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-slate-900">Rs. {parseFloat(order.total_amount).toFixed(2)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status_name)}`}>
                                                {order.status_name}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">{formatDate(order.created_at)}</td>
                                        <td className="px-4 py-3 text-center">
                                            {onView && (
                                                <button
                                                    onClick={() => onView(order)}
                                                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                                                    title="View details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
