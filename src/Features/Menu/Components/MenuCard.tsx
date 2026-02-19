import React from 'react';
import type { MenuItem } from '../../../Types/menu';
import { useCart } from '../../Cart';


interface FoodCardProps {
    item: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
    const { addToCart, cartItems, updateQuantity } = useCart();

    const existingInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    const quantity = existingInCart ? existingInCart.quantity : 0;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h3>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                    {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-gray-900">
                        <span className="text-primary text-sm mr-1">Rs.</span>
                        {item.price}
                    </span>

                    {quantity > 0 ? (
                        <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md  shadow-sm hover:text-primary active:scale-95 transition-all"
                            >
                                -
                            </button>
                            <span className="font-bold text-gray-800 text-sm w-4 text-center">{quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-primary  rounded-md shadow-sm hover:bg-primary-hover active:scale-95 transition-all"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(item)}
                            className="cursor-pointer bg-[#002366]/10 text-[#002366] hover:bg-[#002366] hover:text-[#D4AF37] px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
