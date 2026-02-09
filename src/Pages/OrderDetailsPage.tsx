import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../Context/OrderContext';
import QuickMenuPopup from '../Components/Layout/QuickMenuPopup';
import { useState } from 'react';

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const { orders } = useOrders();
    const order = orders[orderId!];
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-xl font-bold">Order Not Found</h2>
                <Link to="/menu" className="text-[#002366] underline mt-2">Back to Menu</Link>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-4 px-4">
            <div className="w-[90vw] max-w-2xl h-[85vh] bg-white rounded-[2vw] md:rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                {/* Header Section */}
                <div className="bg-[#002366] p-[3vh] md:p-8 text-white shrink-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-200 text-[1.5vh] md:text-sm uppercase tracking-wider font-semibold">Order Confirmed</p>
                            <h1 className="text-[3vh] md:text-3xl font-bold mt-1">#{order.orderId.slice(0, 8)}</h1>
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                            <span className="text-[1.5vh] md:text-sm font-bold capitalize">{order.status}</span>
                        </div>
                    </div>
                </div>

                {/* Details Wrapper - Flex Column for Layout */}
                <div className="flex flex-col flex-1 min-h-0">

                    {/* Location & Date (Fixed Top) */}
                    <div className="px-[3vh] pt-[3vh] md:px-8 md:pt-8 shrink-0">
                        <div className="grid grid-cols-2 gap-8 pb-[2vh] border-b border-gray-100">
                            <div>
                                <p className="text-gray-400 text-[1.2vh] md:text-xs uppercase font-bold tracking-widest">Location</p>
                                <p className="text-[1.8vh] md:text-lg font-bold text-gray-800 capitalize">{order.type}: {order.locationId}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[1.2vh] md:text-xs uppercase font-bold tracking-widest">Date</p>
                                <p className="text-[1.8vh] md:text-lg font-bold text-gray-800">
                                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Items List Header (non-scrollable) */}
                    <div className="px-[3vh] md:px-8 pt-[2vh] shrink-0">
                        <h3 className="text-gray-800 font-bold mb-[1.5vh]">Order Summary</h3>
                    </div>

                    {/* Items List (Scrollable Middle) */}
                    <div className="px-[3vh] md:px-8 pb-[2vh] overflow-y-auto flex-1">
                        <div className="space-y-[1.5vh] md:space-y-4">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold text-[#002366] shrink-0">
                                            {item.quantity}x
                                        </span>
                                        <span className="font-medium text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900 shrink-0">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*  Total & Buttons (Fixed Bottom) */}
                    <div className="px-[3vh] pb-[3vh] md:px-8 md:pb-8 pt-[2vh] bg-gray-50/50 border-t border-gray-100 shrink-0">
                        <div className="flex justify-between items-center mb-[2vh]">
                            <span className="text-[2vh] md:text-xl font-bold text-gray-800">Total Amount</span>
                            <span className="text-[2.5vh] md:text-2xl font-black text-[#002366]">
                                Rs. {order.items.reduce((sum: number, i: any) => sum + (i.price * i.quantity), 0).toFixed(2)}
                            </span>
                        </div>

                        <div className="flex flex-col gap-[1.5vh] md:gap-3">
                            {/*  Add Order (Keep Context) */}
                            <Link
                                to='/cafe-orders'
                                className="block text-center w-full py-[1.5vh] md:py-4 bg-[#002366] text-white font-bold rounded-xl transition-all hover:bg-primary shadow-lg shadow-[#002366]/10"
                            >
                                Order
                            </Link>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setIsPopupOpen(true)}
                                    className="block text-center w-full py-[1.5vh] md:py-4 bg-white border-2 border-[#002366] text-[#002366] font-bold rounded-xl transition-all hover:bg-slate-50 cursor-pointer text-sm md:text-base"
                                >
                                    Add Items
                                </button>

                                {/*  All Orders (View List) */}
                                <Link
                                    to="/orderForm"
                                    className=" text-center w-full py-[1.2vh] md:py-3 bg-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center"
                                >
                                    New Order
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Overlay moved outside the card for better coverage */}
            {isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsPopupOpen(false)}
                    />

                    {/* Popup Content */}
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