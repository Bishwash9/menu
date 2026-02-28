import React, { useState, useEffect } from 'react';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { IconCurrencyRupeeNepalese } from '@tabler/icons-react';
import { CafeStatCard, OrderTable, OrderModal } from '../Features/CafeOrders';
import type { Order } from '../Types/order';
import { orderService } from '../Services/orderService';
import { useAuth } from '../Context/AuthContext';

const CafeOrdersPage: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        if (!user?.business_id) {
            setError('Business ID not found');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const response = await orderService.getOrders(user.business_id);
            setOrders(response || []);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch orders');
            console.error('Error fetching orders:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate stats from actual data
    const stats = {
        pendingOrders: orders.filter(o => 
            o.status_name.toLowerCase().includes('pending') || 
            o.status_name.toLowerCase().includes('preparing')
        ).length,
        activeTables: new Set(
            orders
                .filter(o => 
                    o.table_id && 
                    !o.status_name.toLowerCase().includes('complete') && 
                    !o.status_name.toLowerCase().includes('cancelled')
                )
                .map(o => o.table_number)
        ).size,
        todayRevenue: orders
            .filter(o => !o.status_name.toLowerCase().includes('cancelled'))
            .reduce((sum, o) => sum + parseFloat(o.total_amount || '0'), 0),
        completedOrders: orders.filter(o => 
            o.status_name.toLowerCase().includes('complete')
        ).length,
    };

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="space-y-6">

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    value={`Rs. ${stats.todayRevenue.toFixed(2)}`}
                    icon={<IconCurrencyRupeeNepalese size={24} className="text-[#D4AF37]" />}
                    iconBgColor="bg-[#D4AF37]/20"
                />
                <CafeStatCard
                    title="Completed"
                    value={stats.completedOrders}
                    icon={<TrendingUp size={24} className="text-blue-600" />}
                    iconBgColor="bg-blue-100"
                />
            </div>

            {/* Main Content */}
            <div className="w-full">
                {isLoading ? (
                    <div className="bg-white rounded-xl p-8 text-center">
                        <p className="text-slate-500">Loading orders...</p>
                    </div>
                ) : (
                    <OrderTable
                        orders={orders}
                        onView={handleViewOrder}
                        onRefresh={fetchOrders}
                    />
                )}
            </div>

            {/* Order Modal */}
            {selectedOrder && (
                <OrderModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    order={selectedOrder}
                />
            )}
        </div>
    );
};

export default CafeOrdersPage;