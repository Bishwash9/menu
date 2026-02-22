import React from 'react';
import { useCart } from "../../../Context/CartContext";

export const FloatingCartBar: React.FC = () => {
    const { cartCount, cartTotal, toggleCart } = useCart();

    if (cartCount === 0) return null;

    return (
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-black text-white rounded-2xl p-4 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-600/50 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .315.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold">{cartCount} Items in cart</p>
                        <p className="font-bold text-lg">NPR {cartTotal}</p>
                    </div>
                </div>
                <button
                    onClick={toggleCart}
                    className="bg-white text-black font-bold px-6 py-3 rounded-xl active:scale-95 transition-all text-sm">
                    View Cart
                </button>
            </div>
        </div>
    );
};