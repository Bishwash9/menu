import { useState } from 'react';
import { SideBar } from '../Components/Layout/Sidebar';
import { Download, Plus } from 'lucide-react';
import {
    MenuStatCard,
    MenuModal,
    MenuContent,
    MOCK_MENU_ITEMS,
    type MenuItem,
} from '../Features/MenuManagement';

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

    const handleExport = () => {
        const headers = ['ID', 'Name', 'Category', 'Price', 'Diet Info', 'Prep Time', 'Rating', 'Calories', 'Status'];
        const rows = items.map(item => [
            item.id,
            item.name,
            item.category,
            item.price,
            item.dietInfo,
            item.prepTime,
            item.rating,
            item.calories,
            item.status,
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `menu_items_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
            <SideBar/>

            <main className="flex-1 overflow-hidden flex flex-col w-full">
                {/* Header - Blank Space */}
                <div className="h-12 md:h-16 bg-white border-b border-slate-200"></div>

                {/* Title Section - Fixed */}
                <div className="bg-white border-b border-slate-200 p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] mb-1">
                                    Food Menu Management
                                </h1>
                                <p className="text-slate-600 text-sm md:text-base">
                                    Manage your restaurant menu, dishes, and categories
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold hover:bg-[#1E3A8A]/10 transition-colors min-h-11 text-sm md:text-base"
                                >
                                    <Download size={18} />
                                    Export
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingItem(null);
                                        setIsModalOpen(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white font-bold hover:bg-[#D4AF37] transition-colors min-h-11 text-sm md:text-base cursor-pointer"
                                >
                                    <Plus size={18} />
                                    Add New Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards - Fixed */}
                <div className="bg-white border-b border-slate-200 p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto p-4 md:p-6">
                        {/* Menu Content */}
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
