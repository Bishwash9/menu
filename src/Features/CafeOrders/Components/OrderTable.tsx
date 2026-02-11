import React, { useState } from 'react';
import { Search} from 'lucide-react';
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
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
    const [typeFilter, setTypeFilter] = useState<OrderType | 'All'>('All');
    // const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
            case 'Dine In': return '';
            case 'Takeaway': return '';
            case 'Room Service': return '';
            default: return '';
        }
    };


    return (
        <div className="w-full mt-[2vh]">
            {/* Filters */}
            <div className=" bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-3 items-end mb-[2vh]">
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

            {/* Table */}
            <div className="rounded-xl  border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100 border-b border-slate-200">
                            <tr className="bg-slate-100">
                                <th className="px-4 py-3 text-left font-bold text-slate-700">Order ID</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">Customer</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">Type</th>
                                <th className='px-4 py-3 text-left font-bold text-slate-700'>Table</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">Items</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">Status</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">Priority</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">Total</th>




                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 ">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
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
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {order.tableNumber || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ').slice(0, 30)}
                                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ').length > 30 && '...'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className={`px-4 py-3 font-medium ${getPriorityColor(order.priority)}`}>
                                        {order.priority}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-semibold text-[#D4AF37]">Rs.{order.total.toFixed(2)}</span>
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
