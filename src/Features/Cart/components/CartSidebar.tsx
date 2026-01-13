import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

export const CartSidebar: React.FC = () => {
    const {
        isCartOpen,
        toggleCart,
        cartItems,
        updateQuantity,
        removeFromCart,
        cartTotal,
    } = useCart();

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isCartOpen]);

    // Slide-up for mobile, Slide-from-right for desktop
    const sidebarClass = `fixed inset-0 md:left-auto md:right-0 md:w-[450px] bg-gray-50 md:bg-white shadow-2xl z-[60] transform transition-transform duration-500 ease-in-out ${isCartOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0"}`;
    const overlayClass = `fixed inset-0 bg-black/50 z-[55] transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`;

    const taxAmount = cartTotal * 0.13;
    const grandTotal = cartTotal + taxAmount;

    return (
        <>
            <div className={overlayClass} onClick={toggleCart} />

            <div className={sidebarClass}>
                <div className="flex flex-col h-full">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
                        {/* Back Arrow for Mobile / Close Title for Desktop */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleCart}
                                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5 8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                        </div>
                        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {cartItems.length} items
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 no-scrollbar bg-gray-50/50">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-10 h-10 text-primary/50"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Add some delicious food to get started!
                                    </p>
                                </div>
                                <button
                                    onClick={toggleCart}
                                    className="mt-4 text-primary font-bold hover:underline"
                                >
                                    Browse Menu
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white p-3 rounded-2xl flex gap-4 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                    >
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-800 text-sm leading-tight">
                                                    {item.name}
                                                </h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18 18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-primary font-bold text-xs mt-1 uppercase tracking-wider">
                                                NRP {item.price}
                                            </p>

                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center bg-gray-50 rounded-full p-0.5 border border-gray-100 shadow-inner">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-400 hover:text-primary active:scale-95 disabled:opacity-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-bold text-gray-800 min-w-[32px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center bg-primary rounded-full shadow-sm text-white hover:bg-primary-hover active:scale-95"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="font-bold text-gray-800 text-sm">
                                                    NRP {item.price * item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-100 p-6 bg-white space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Subtotal</span>
                                    <span>NRP {cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Tax (13%)</span>
                                    <span>NRP {taxAmount.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Delivery Fee</span>
                                    <span>NRP 50</span>
                                </div>
                                <div className="flex justify-between text-gray-900 font-bold text-lg pt-4 mt-2 border-t border-gray-100">
                                    <span>Total Amount</span>
                                    <span>NRP {grandTotal + 50}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-primary text-xs font-bold bg-primary/5 p-3 rounded-xl border border-primary/10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                                    />
                                </svg>
                                1 Coupon Applied
                            </div>

                            <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                Proceed to Checkout
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
