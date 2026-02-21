export type DietInfo = 'Veg' | 'Non-Veg' | 'Vegan';
export type MenuItemStatus = 'Available' | 'Unavailable' | 'Coming Soon';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    prepTime: number; // in minutes
    status: MenuItemStatus;
    image?: string;
    spiceLevel?: string;
}

export interface MenuStats {
    totalItems: number;
    availableNow: number;
    totalCategories: number;
}
