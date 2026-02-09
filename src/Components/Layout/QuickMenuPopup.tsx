
import { CartProvider } from "../../Features/Cart";
import { FoodCard } from "../../Features/Menu/Components/MenuCard";
import { CartSidebar } from "../../Features/Cart/Components/CartSidebar";
import { MOCK_MENU_ITEMS } from "../../Lib/data";
import { X } from "lucide-react";

interface QuickMenuPopupProps {
    orderData: { orderType: string; identifier: string };
    onClose: () => void;
}


export default function QuickMenuPopup({ orderData, onClose }: QuickMenuPopupProps) {
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {MOCK_MENU_ITEMS.map((item) => (
                                <FoodCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className="w-80 border-l border-slate-200 ">
                        <CartSidebar isPopupView={true} orderData={orderData} onOrderComplete={onClose} />
                    </div>
                </div>

            </div>
        </CartProvider>
    )
}


