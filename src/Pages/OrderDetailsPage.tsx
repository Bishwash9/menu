import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Clock3, MapPin, Plus, ReceiptText } from 'lucide-react';
import { useOrders } from '../Context/OrderContext';
import QuickMenuPopup from '../Components/Layout/QuickMenuPopup';

interface OrderItem {
    id: number;
    name: string;
    price: string | number;
    quantity: number;
}

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { orders } = useOrders();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const order = orderId ? orders[orderId] : undefined;

    const subtotal = useMemo(() => {
        if (!order) return 0;
        return order.items.reduce((sum: number, item: OrderItem) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return sum + price * item.quantity;
        }, 0);
    }, [order]);

    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <h2 className="text-2xl font-bold text-slate-800">Order Not Found</h2>
                <p className="text-slate-500 mt-2">This order may be closed, missing, or not created yet.</p>
                <div className="mt-6 flex gap-3">
                    <Link to="/orderForm" className="px-4 py-2 bg-[#002366] text-white rounded-lg font-semibold hover:bg-primary transition-colors">
                        Create New Order
                    </Link>
                    <Link to="/menu" className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                        Back to Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-[#002366] text-white px-5 py-4 md:px-6 md:py-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-blue-200 text-xs md:text-sm uppercase tracking-wider font-semibold">Order Confirmed</p>
                                <h1 className="text-2xl md:text-3xl font-bold mt-1">#{order.orderId.slice(0, 8)}</h1>
                            </div>
                            <span className="bg-white/15 px-3 py-1.5 rounded-lg text-sm font-bold capitalize">
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="p-5 md:p-6 border-b border-slate-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#002366] mt-1" />
                                <div>
                                    <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Location</p>
                                    <p className="text-base font-bold text-slate-800 capitalize">
                                        {order.type}: {order.locationId}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock3 size={18} className="text-[#002366] mt-1" />
                                <div>
                                    <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Created</p>
                                    <p className="text-base font-bold text-slate-800">
                                        {new Date(order.createdAt).toLocaleString([], {
                                            year: 'numeric',
                                            month: 'short',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 md:p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Order Items</h3>
                        {order.items.length === 0 ? (
                            <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-4">
                                No items in this order.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {order.items.map((item: OrderItem) => {
                                    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                                    return (
                                        <div key={item.id} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-[#002366]">
                                                    {item.quantity}x
                                                </span>
                                                <span className="font-semibold text-slate-700">{item.name}</span>
                                            </div>
                                            <span className="font-bold text-slate-900">
                                                Rs. {(price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 h-fit">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <ReceiptText size={18} className="text-[#002366]" />
                        Bill Summary
                    </h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-slate-600">
                            <span>Subtotal</span>
                            <span>Rs. {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Tax (13%)</span>
                            <span>Rs. {tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-slate-900 pt-3 mt-2 border-t border-slate-200">
                            <span>Total Amount</span>
                            <span>Rs. {total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-5 space-y-3">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="w-full py-3 bg-[#002366] text-white rounded-xl font-bold hover:bg-primary transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={16} />
                            Add Items
                        </button>

                        <button
                            onClick={() => navigate('/orderForm')}
                            className="w-full py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                        >
                            New Order
                        </button>

                        <button
                            onClick={() => navigate('/cafe-orders')}
                            className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                        >
                            All Orders
                        </button>
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsPopupOpen(false)}
                    />

                    <div className="relative z-10 w-full max-w-6xl mx-auto animate-in zoom-in-95 duration-200">
                        <QuickMenuPopup
                            orderData={{ orderType: order.type, identifier: order.locationId }}
                            onClose={() => setIsPopupOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsPage;
