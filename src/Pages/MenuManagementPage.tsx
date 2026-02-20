import { useState } from 'react';
import { useEffect } from 'react';
import { menuService } from '../Services/menuService';
import { SideBar } from '../Components/Layout/Sidebar';
import { LayoutGrid, CheckCircle2, Layers } from 'lucide-react';

import {
    MenuStatCard,
    // MenuModal,
    MenuContent,
    type MenuItem,
} from '../Features/MenuManagement';
import { DashboardHeader } from '../Components/Layout';
import { useAuth } from '../Context/AuthContext';

function MenuManagementPage() {

    

    //initiliazation
    const [items, setItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string |null>(null);
    
    const {user} = useAuth();

    //fetching data
    useEffect(()=>{
        const fetchMenuItems = async () =>{

            if(!user?.business_id){
                console.error('User does not have a business_id');
                return;
            }

            try{
                setIsLoading(true);
                const data = await menuService.getMenuItems(user.business_id);


                // maping data
                    const mappedItems: MenuItem[] = data.map(item => ({
                    id: item.id.toString(), 
                    business_id: item.business_id,
                    business_name: item.business_name,
                    name: item.name,
                    description: item.description,
                    category: item.category_name,
                    price: parseFloat(item.price),
                    prepTime: item.preparation_time, 
                    status: item.is_available ? 'Available' : 'Unavailable',
                    image: item.image || undefined,
                    isAvailable: item.is_available,
                    spiceLevel: item.spice_level_name
                }));
                setItems(mappedItems);
                setError(null);

            }catch(error){
                console.error('Error fetching menu items:', error);
                setError('Failed to load menu items. Please try again.');
            }finally{
                setIsLoading(false);
            }
        };
        fetchMenuItems();
    }, [user?.business_id]);


    
   
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-dashboard-bg">
                <div className="text-xl font-semibold text-slate-600">Loading Menu...</div>
            </div>
        );
    }
    

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-dashboard-bg">
                 <div className="text-red-500">{error}</div>
            </div>
        );
    }
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
