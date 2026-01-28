import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { MenuItem } from '../Types';

interface MenuContentProps {
    items: MenuItem[];
    onEdit?: (item: MenuItem) => void;
    onDelete?: (itemId: string) => void;
    onView?: (item: MenuItem) => void;
}

export const MenuContent: React.FC<MenuContentProps> = ({
    items,

}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === '' || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });



    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available':
                return 'bg-green-100 text-green-700';
            case 'Unavailable':
                return 'bg-red-100 text-red-700';
            case 'Coming Soon':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const categories = Array.from(new Set(items.map(item => item.category)));

    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-end">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">ITEM</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">CATEGORY</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">PRICE</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">PREP TIME</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">STATUS</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-bold text-slate-800">{item.name}</p>

                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{item.category}</td>
                                    <td className="px-4 py-3 font-bold text-[#D4AF37]">Rs.{item.price}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.prepTime} min</td>

                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                    No menu items found. Try adjusting your filters.
                </div>
            )}
        </div>
    );
};
