import { useState, useMemo, useEffect } from 'react';
import { CartProvider } from '../Features/Cart';
import { Header } from '../Components/Layout/Header';
import { CategoryFilter } from '../Features/Menu/Components/CategoryFilter';
import { FoodCard } from '../Features/Menu/Components/MenuCard';
import { CartSidebar } from '../Features/Cart/Components/CartSidebar';
import { FloatingCartBar } from '../Features/Cart/Components/FloatingCartBar';
import { menuService } from '../Services/menuService';
import type { MenuItem } from '../Types/menu';
import { useAuth } from '../Context/AuthContext';



function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    const {user} = useAuth();



    useEffect(() => {
        const fetchMenuItems = async () => {

            if(!user?.business_id){
                console.error('User does not have a business id');
                return;
            }

            try {
                const response = await menuService.getMenuItems(user?.business_id || 1);
                setMenuItems(response);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch menu items:', error);
                setError('Failed to load menu items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchMenuItems();
    }, []);

   const categories = useMemo(() => {
        const map = new Map<number, string>();
        menuItems.forEach((item) => {
            if (!map.has(item.category_id)) {
                map.set(item.category_id, `Category ${item.category_id}`);
            }
        });
        return Array.from(map, ([id, name]) => ({ id, name }));
    }, [menuItems]);

    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            const matchesCategory =
                activeCategory === 'all' || item.category_id.toString() === activeCategory;
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery, menuItems]);

    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-50 pb-20">
                <Header onSearch={setSearchQuery} />

                <div className="max-w-7xl mx-auto">
                    <div className="sticky top-18 z-40 bg-gray-50/95 backdrop-blur-sm pt-2 pb-2">
                        <CategoryFilter
                            activeCategory={activeCategory}
                            onSelectCategory={setActiveCategory}
                            categories={categories}
                        />
                    </div>

                    <main className="px-4 md:px-8 py-6">
                        {loading && (
                            <div className='flex justify-center items-center py-20 '>
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        )}
                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}
                        {!loading && !error && filteredItems.length > 0 && (
                            <>
                                <div className='mb-6'>
                                    <h2 className='text-2xl font-bold text-gray-800'>
                                        {activeCategory === 'all' ? 'All Items' : `Category: ${activeCategory}`}
                                    </h2>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                   {filteredItems.map((item)=> (
                                        <FoodCard key ={item.id} item={item}/>
                                   ))} 
                                </div>
                            </>
                        )}
                        {!loading && filteredItems.length === 0 && (
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
