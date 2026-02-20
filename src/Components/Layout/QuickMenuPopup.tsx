
import { useEffect, useState } from "react";
import { CartProvider } from "../../Features/Cart";
import { FoodCard } from "../../Features/Menu/Components/MenuCard";
import { CartSidebar } from "../../Features/Cart/Components/CartSidebar";
import { menuService } from "../../Services/menuService";
import type { MenuItem } from "../../Types/menu";
import { X } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

interface QuickMenuPopupProps {
    orderData: { orderType: string; identifier: string };
    onClose: () => void;
}


export default function QuickMenuPopup({ orderData, onClose }: QuickMenuPopupProps) {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {user} = useAuth();

   useEffect(()=>{
        const fetchMenuItems = async () =>{

            if(!user?.business_id){
                console.error('User does not have a business id');
                return;
            }

            try{
                setLoading(true);
                const data = await menuService.getMenuItems(user.business_id);
                setMenuItems(data);
                setError(null);
            }catch(error){
                console.error('Error fetching menu items', error);
                setError('Failed to load menu items. Please try again later.');
            }finally{
                setLoading(false);
            }
        };
        fetchMenuItems();
   },[user?.business_id])

    return (
        <CartProvider>
            <div className="flex flex-col h-[85vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl">

                <div className="p-5 border-5 flex justify-between items-center border-slate-50/50">
                    <h2 className="text-xl text-primary font-bold">Order for {orderData.identifier}</h2>
                    <button onClick={onClose} className="cursor-pointer p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50/20">
                        {loading && (
                            <div className="flex justify-center items-center py-16">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}
                        {!loading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {menuItems.map((item) => (
                                    <FoodCard key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-80 border-l border-slate-200 ">
                        <CartSidebar isPopupView={true} orderData={orderData} onOrderComplete={onClose} />
                    </div>
                </div>

            </div>
        </CartProvider>
    )
}


