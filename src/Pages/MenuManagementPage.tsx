import { useState } from 'react';
import { SideBar } from '../Components/Layout/Sidebar';
import { LayoutGrid, CheckCircle2, Layers } from 'lucide-react';
import { MOCK_MENU_ITEMS as SHARED_MENU_ITEMS } from '../Lib/data';
import {
    MenuStatCard,
    // MenuModal,
    MenuContent,
    type MenuItem,
} from '../Features/MenuManagement';
import { DashboardHeader } from '../Components/Layout';

function MenuManagementPage() {

    const initialItems: MenuItem[] = SHARED_MENU_ITEMS.map(item => ({
        id: item.id.toString(),
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        prepTime: 20,
        status: 'Available',
    }));

    const [items] = useState<MenuItem[]>(initialItems);
    // const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    // const [showViewModal, setShowViewModal] = useState(false);

    const stats = {
        totalItems: items.length,
        availableNow: items.filter(i => i.status === 'Available').length,
        totalCategories: new Set(items.map(i => i.category)).size,
    };



    return (
        <div className="flex h-screen bg-dashboard-bg">
            <SideBar />

            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200">
                    <DashboardHeader />
                </div>

                <div className="p-6">



                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <MenuStatCard
                            title="Total Items"
                            value={stats.totalItems}

                            icon={<LayoutGrid size={20} />}
                            iconColor="royal"
                        />
                        <MenuStatCard
                            title="Available Now"
                            value={stats.availableNow}

                            icon={<CheckCircle2 size={20} />}
                            iconColor="green"
                        />
                        <MenuStatCard
                            title="Categories"
                            value={stats.totalCategories}
                            icon={<Layers size={20} />}
                            iconColor="purple"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-6">
                        <MenuContent
                            items={items}
                        />
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            {/* <MenuModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                }}
                onSave={handleAddItem}
                editingItem={editingItem || undefined}
            /> */}

            {/* View Modal */}
            {/* {showViewModal && selectedItem && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold text-status-confirmed mb-4">{selectedItem.name}</h2>
                        <div className="space-y-3 mb-6">
                            <div>
                                <p className="text-sm text-slate-600 font-bold">Description</p>
                                <p className="text-slate-800">{selectedItem.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Price</p>
                                    <p className="text-lg font-bold text-[#D4AF37]">Rs. {selectedItem.price}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
                                        <Layers size={14} className="text-slate-400" />
                                        {selectedItem.category}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Status</p>
                                    <p className="text-slate-800">{selectedItem.status}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowViewModal(false)}
                            className="w-full px-4 py-2 rounded-lg bg-status-confirmed text-white font-bold hover:bg-status-confirmed/90"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default MenuManagementPage;
