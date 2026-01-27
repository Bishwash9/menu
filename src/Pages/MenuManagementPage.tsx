import { useState } from 'react';
import { SideBar } from '../Components/Layout/Sidebar';
import { Plus } from 'lucide-react';
import {
    MenuStatCard,
    MenuModal,
    MenuContent,
    MOCK_MENU_ITEMS,
    type MenuItem,
} from '../Features/MenuManagement';
import { DashboardHeader } from '../Components/Layout';

function MenuManagementPage() {
    const [items, setItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);

    const stats = {
        totalItems: items.length,
        availableNow: items.filter(i => i.status === 'Available').length,
        topRated: items.filter(i => i.rating >= 4).length,
        totalCategories: new Set(items.map(i => i.category)).size,
    };

    const handleAddItem = (item: MenuItem) => {
        if (editingItem) {
            setItems(items.map(i => i.id === item.id ? item : i));
            setEditingItem(null);
        } else {
            setItems([...items, item]);
        }
    };

    const handleDeleteItem = (itemId: string) => {
        setItems(items.filter(i => i.id !== itemId));
    };

    const handleEditItem = (item: MenuItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleViewItem = (item: MenuItem) => {
        setSelectedItem(item);
        setShowViewModal(true);
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
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setEditingItem(null);
                                    setIsModalOpen(true);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#D4AF37] text-white font-bold hover:bg-[#b8962e] transition-colors shadow-sm cursor-pointer"
                            >
                                <Plus size={18} />
                                Add New Item
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <MenuStatCard
                            title="Total Items"
                            value={stats.totalItems}
                            trend="+8%"
                            trendUp={true}
                            icon={(props) => <span {...props}>🍽️</span>}
                            iconColor="royal"
                        />
                        <MenuStatCard
                            title="Available Now"
                            value={stats.availableNow}
                            trend="+12%"
                            trendUp={true}
                            icon={(props) => <span {...props}>✓</span>}
                            iconColor="green"
                        />
                        <MenuStatCard
                            title="Top Rated"
                            value={stats.topRated}
                            trend="+15%"
                            trendUp={true}
                            icon={(props) => <span {...props}>⭐</span>}
                            iconColor="golden"
                        />
                        <MenuStatCard
                            title="Categories"
                            value={stats.totalCategories}
                            icon={(props) => <span {...props}>📂</span>}
                            iconColor="purple"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-6">
                        <MenuContent
                            items={items}
                            onEdit={handleEditItem}
                            onDelete={handleDeleteItem}
                            onView={handleViewItem}
                        />
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            <MenuModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                }}
                onSave={handleAddItem}
                editingItem={editingItem || undefined}
            />

            {/* View Modal */}
            {showViewModal && selectedItem && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">{selectedItem.name}</h2>
                        <div className="space-y-3 mb-6">
                            <div>
                                <p className="text-sm text-slate-600 font-bold">Description</p>
                                <p className="text-slate-800">{selectedItem.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Price</p>
                                    <p className="text-lg font-bold text-[#D4AF37]">${selectedItem.price}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Rating</p>
                                    <p className="text-lg font-bold">⭐ {selectedItem.rating}/5</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Diet</p>
                                    <p className="text-slate-800">{selectedItem.dietInfo}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Prep Time</p>
                                    <p className="text-slate-800">{selectedItem.prepTime} min</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Calories</p>
                                    <p className="text-slate-800">{selectedItem.calories}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Status</p>
                                    <p className="text-slate-800">{selectedItem.status}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowViewModal(false)}
                            className="w-full px-4 py-2 rounded-lg bg-[#1E3A8A] text-white font-bold hover:bg-[#1E3A8A]/90"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MenuManagementPage;
