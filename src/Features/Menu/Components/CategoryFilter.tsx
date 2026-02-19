import React from 'react';



interface CategoryFilterProps {
    activeCategory: string;
    onSelectCategory: (id: string) => void;
    categories: { id: number; name:string }[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelectCategory, categories }) => {
    const list = [{ id: 0, name: 'All' }, ...categories];
    return (
        <div className="flex items-center gap-3 overflow-x-auto py-4 px-4 no-scrollbar">
            {list.map((cat) => {
                const id = cat.id === 0 ? 'all' : String(cat.id);
                const isActive = activeCategory === id;

                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(id)}
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
