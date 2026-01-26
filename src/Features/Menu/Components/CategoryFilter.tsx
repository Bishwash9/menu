import React from 'react';
import { CATEGORIES } from '../../../lib/data';
import type { Category } from '../../../lib/data';

interface CategoryFilterProps {
    activeCategory: string;
    onSelectCategory: (id: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelectCategory }) => {
    return (
        <div className="flex items-center gap-3 overflow-x-auto py-4 px-4 no-scrollbar">
            {CATEGORIES.map((cat: Category) => {
                const isActive = activeCategory === cat.id;

                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`
              whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${isActive
                                ? 'bg-[#002366] text-[#D4AF37] border border-[#002366] shadow-md shadow-primary/30 transform scale-105'
                                : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 hover:border-[#002366]/20'
                            }
            `}
                    >
                        {cat.name}
                    </button>
                );
            })}
        </div>
    );
};
