import React from "react";
import { useCart } from "../../Features/Cart/Context/CartContext";

export const BottomNav: React.FC = () => {
    const { cartCount, toggleCart } = useCart();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-3 px-4 z-50">
            {/* HOME */}
            <button className="flex flex-col items-center gap-1 group">
                <div className="text-gray-400 group-active:text-primary transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.719c-1.035 0-1.875-.84-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.432z" />
                    </svg>
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-active:text-primary uppercase tracking-tighter">
                    Home
                </span>
            </button>

            {/* MENU */}
            <button className="flex flex-col items-center gap-1 group">
                <div className="text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                    Menu
                </span>
            </button>

            {/* CART */}
            <button
                onClick={toggleCart}
                className="flex flex-col items-center gap-1 group relative"
            >
                <div className="text-gray-400 group-active:text-primary transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .315.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                </div>
                {cartCount > 0 && (
                    <span className="absolute -top-1 right-0 bg-primary text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                        {cartCount}
                    </span>
                )}
                <span className="text-[10px] font-bold text-gray-400 group-active:text-primary uppercase tracking-tighter">
                    Cart
                </span>
            </button>

            {/* PROFILE */}
            <button className="flex flex-col items-center gap-1 group">
                <div className="text-gray-400 group-active:text-primary transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-active:text-primary uppercase tracking-tighter">
                    Profile
                </span>
            </button>
        </nav>
    );
};