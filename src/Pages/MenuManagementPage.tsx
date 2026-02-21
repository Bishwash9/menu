
import { LayoutGrid, CheckCircle2, Layers } from 'lucide-react';
import {
    MenuStatCard,
    MenuContent,
} from '../Features/MenuManagement';


import { useMenu } from '../Context/MenuContext';

function MenuManagementPage() {

    const {menuItems, loading, error} = useMenu();

    if (loading) {
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
        totalItems: menuItems.length,
        availableNow: menuItems.filter(i => i.status === 'Available').length,
        totalCategories: new Set(menuItems.map(i => i.category)).size,
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
                    items={menuItems}
                />
            </div>
        </div>
    );

}

export default MenuManagementPage;
