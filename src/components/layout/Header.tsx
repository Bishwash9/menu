import React, { useState } from "react";
import { useCart } from "../../Features/Cart/context/CartContext";

interface HeaderProps {
    onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const { cartCount, toggleCart } = useCart();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm py-4 px-4 md:px-8 flex items-center justify-between min-h-18">
            {/* Mobile search expanded view */}
            {isSearchExpanded ? (
                <div className="flex-1 flex items-center gap-2 animate-in  slide-in-from-right-4 duration-300">
                    <button
                        onClick={() => setIsSearchExpanded(false)}
                        className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
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

                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </span>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search for food..."
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                        />
                    </div>
                </div>
            ) : (
                <>
                    {/* LEFT AREA: LOCATION (MOBILE) / LOGO (DESKTOP) */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                                F
                            </div>
                            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                                FoodieGrid
                            </h1>
                        </div>
                    </div>

                    {/* DESKTOP SEARCH BAR */}
                    <div className="flex-1 max-w-md mx-4 hidden md:block">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search for food..."
                                onChange={(e) => onSearch(e.target.value)}
                                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* RIGHT AREA: SEARCH BUTTON (MOBILE) / CART BUTTON (DESKTOP) */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSearchExpanded(true)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 shadow-sm text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={toggleCart}
                            className="hidden md:flex relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-700"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>

                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#002366] text-[#ffd700] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </>
            )}
        </header>
    );
};
