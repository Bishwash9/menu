import { useState, useEffect } from 'react';
import { menuService } from '../Services/menuService';
import { LayoutGrid, CheckCircle2, Layers } from 'lucide-react';
import {
    MenuStatCard,
    MenuContent,
    type MenuItem,
} from '../Features/MenuManagement';

import { useAuth } from '../Context/AuthContext';

function MenuManagementPage() {



    //initiliazation
    const [items, setItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { user } = useAuth();

    //fetching data
    useEffect(() => {
        const fetchMenuItems = async () => {

            if (!user?.business_id) {
                console.error('User does not have a business_id');
                return;
            }

            try {
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

            } catch (error) {
                console.error('Error fetching menu items:', error);
                setError('Failed to load menu items. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenuItems();
    }, [user?.business_id]);




    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-xl font-semibold text-slate-600">Loading Menu...</div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
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
        <div className="space-y-6">
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
    );

}

export default MenuManagementPage;
