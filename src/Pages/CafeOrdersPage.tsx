import React, { useState } from 'react';
import { Plus, Clock, Users, DollarSign} from 'lucide-react';
import { SideBar } from '../Components/Layout/Sidebar';
import {
    CafeStatCard,
    OrderModal,
    OrderTable,
    initialOrders,

} from '../Features/CafeOrders';
import type { CafeOrder, OrderStatus } from '../Features/CafeOrders/Types';
import { DashboardHeader } from '../Components/Layout';

const CafeOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<CafeOrder[]>(initialOrders);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedOrder, setSelectedOrder] = useState<CafeOrder | null>(null);
    const [statusFilter] = useState<OrderStatus | 'All'>('All');


    // Calculate stats
    const stats = {
        pendingOrders: orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length,
        activeTables: new Set(orders.filter(o => o.tableNumber && o.status !== 'Completed' && o.status !== 'Cancelled').map(o => o.tableNumber)).size,
        todayRevenue: orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0),
    };

    const handleNewOrder = () => {
        setModalMode('add');
        setSelectedOrder(null);
        setIsModalOpen(true);
    };

    const handleEditOrder = (order: CafeOrder) => {
        setModalMode('edit');
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleViewOrder = (order: CafeOrder) => {
        setModalMode('edit');
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleDeleteOrder = (orderId: string) => {
        setOrders(orders.filter(o => o.id !== orderId));
    };

    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    };

    const handleSaveOrder = (orderData: any) => {
        if (orderData.id) {
            // Update existing order
            setOrders(orders.map(o => o.id === orderData.id ? orderData : o));
        } else {
            // Add new order
            const newOrder: CafeOrder = {
                ...orderData,
                id: Date.now().toString(),
                orderNumber: `ORD${String(orders.length + 1).padStart(3, '0')}`,
            };
            setOrders([newOrder, ...orders]);
        }
    };




    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <SideBar />

            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200">
                    <DashboardHeader />
                </div>

                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6">

                        <div className="flex gap-3 flex-wrap">
                            <button
                                onClick={handleNewOrder}
                                className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#b8962e] transition-colors shadow-sm"
                            >
                                <Plus size={18} />
                                New Order
                            </button>
                        </div>
                    </div>

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
                            value={`Rs. ${stats.todayRevenue.toFixed(2)}`}
                            icon={<DollarSign size={24} className="text-[#D4AF37]" />}
                            iconBgColor="bg-[#D4AF37]/20"
                        />

                    </div>



                    {/* Main Content */}
                    <div className="w-full">
                        <div className="w-full overflow-x-auto">
                            <OrderTable
                                orders={statusFilter === 'All' ? orders : orders.filter(o => o.status === statusFilter)}
                                onView={handleViewOrder}
                                onEdit={handleEditOrder}
                                onDelete={handleDeleteOrder}
                                onStatusChange={handleStatusChange}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal */}
            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveOrder}
                order={selectedOrder}
                mode={modalMode}
            />
        </div>
    );
};

export default CafeOrdersPage;
