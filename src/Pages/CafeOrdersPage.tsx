import React, { useState } from 'react';
import { Clock, Users } from 'lucide-react';
import { IconCurrencyRupeeNepalese } from '@tabler/icons-react';
import {
    CafeStatCard,
    OrderTable,
    initialOrders,

} from '../Features/CafeOrders';
import type { CafeOrder, OrderStatus } from '../Features/CafeOrders/Types';


const CafeOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<CafeOrder[]>(initialOrders);
    const [statusFilter] = useState<OrderStatus | 'All'>('All');


    // Calculate stats
    const stats = {
        pendingOrders: orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length,
        activeTables: new Set(orders.filter(o => o.tableNumber && o.status !== 'Completed' && o.status !== 'Cancelled').map(o => o.tableNumber)).size,
        todayRevenue: orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0),
    };





    const handleDeleteOrder = (orderId: string) => {
        setOrders(orders.filter(o => o.id !== orderId));
    };

    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    };






    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <CafeStatCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon={<Clock size={24} className="text-orange-600" />}
                    iconBgColor="bg-orange-100"
                />
                <CafeStatCard
                    title="Active Tables"
                    value={stats.activeTables}
                    icon={<Users size={24} className="text-green-600" />}
                    iconBgColor="bg-green-100"
                />
                <CafeStatCard
                    title="Today's Revenue"
                    value={`${stats.todayRevenue.toFixed(2)}`}
                    icon={<IconCurrencyRupeeNepalese size={24} className="text-dashboard-accent" />}
                    iconBgColor="bg-[#D4AF37]/20"
                />

            </div>

            {/* Main Content */}
            <div className="w-full">
                <div className="w-full overflow-x-auto">
                    <OrderTable
                        orders={statusFilter === 'All' ? orders : orders.filter(o => o.status === statusFilter)}
                        onDelete={handleDeleteOrder}
                        onStatusChange={handleStatusChange}
                    />
                </div>
            </div>
        </div>
    );

};

export default CafeOrdersPage;
