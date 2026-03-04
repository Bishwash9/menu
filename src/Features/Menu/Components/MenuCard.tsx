// src/Features/Menu/Components/MenuCard.tsx

import React from 'react';
import type { MenuItem } from '../../../Types/menu';
import { useCart } from '../../../Context/CartContext';

interface FoodCardProps {
    item: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
    const { addToLocalCart, localCartItems, updateLocalQuantity } = useCart();

    const existingInCart = localCartItems.find(
        (cartItem) => cartItem.food_item_id === item.id
    );
    const quantity = existingInCart ? existingInCart.quantity : 0;

    const handleAddToCart = () => {
        const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
        addToLocalCart({
            food_item_id: item.id,
            name: item.name,
            unit_price: price,
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200">
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={item.image || undefined}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">
                        {item.name}
                    </h3>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                    {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-gray-900">
                        <span className="text-primary text-sm mr-1">Rs.</span>
                        {item.price}
                    </span>

                    {/* Quantity controls or Add button */}
                    {quantity > 0 ? (
                        <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                            <button
                                onClick={() => updateLocalQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-primary active:scale-95 transition-all font-bold"
                            >
                                -
                            </button>
                            <span className="font-bold text-gray-800 text-sm w-4 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() => updateLocalQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-[#002366] text-white rounded-md shadow-sm hover:bg-[#002366]/90 active:scale-95 transition-all font-bold"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="cursor-pointer bg-[#002366]/10 text-[#002366] hover:bg-[#002366] hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95 flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};