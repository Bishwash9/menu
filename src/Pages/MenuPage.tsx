import { useState, useMemo } from 'react';
import { CartProvider } from '../Features/Cart';
import { Header } from '../Components/Layout/Header';
import { CategoryFilter } from '../Features/Menu/components/CategoryFilter';
import { FoodCard } from '../Features/Menu/components/MenuCard';
import { CartSidebar } from '../Features/Cart/Components/CartSidebar';
import { MOCK_MENU_ITEMS, CATEGORIES } from '../Lib/data';
import { FloatingCartBar } from '../Features/Cart/Components/FloatingCartBar';

function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredItems = useMemo(() => {
        return MOCK_MENU_ITEMS.filter((item) => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-50 pb-20">
                <Header onSearch={setSearchQuery} />

                <div className="max-w-7xl mx-auto">
                    <div className="sticky top-18 z-40 bg-gray-50/95 backdrop-blur-sm pt-2 pb-2">
                        <CategoryFilter
                            activeCategory={activeCategory}
                            onSelectCategory={setActiveCategory}
                        />
                    </div>

                    <main className="px-4 md:px-8 py-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {activeCategory === 'all' ? '' : CATEGORIES.find(c => c.id === activeCategory)?.name}
                            </h2>
                        </div>

                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredItems.map((item) => (
                                    <FoodCard key={item.id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-600">No items found</h3>
                                <p className="text-gray-400">Try changing your search or category.</p>
                                <button
                                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                                    className="mt-4 text-[#002366] font-bold hover:underline hover:text-[#D4AF37] transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>

                <CartSidebar />
                <FloatingCartBar />
            </div>
        </CartProvider>
    );
}

export default MenuPage;
