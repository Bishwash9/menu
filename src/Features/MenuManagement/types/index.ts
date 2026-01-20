export type DietInfo = 'Veg' | 'Non-Veg' | 'Vegan';
export type MenuItemStatus = 'Available' | 'Unavailable' | 'Coming Soon';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    dietInfo: DietInfo;
    prepTime: number; // in minutes
    rating: number; // 0-5
    calories: number;
    status: MenuItemStatus;
    image?: string;
}

export interface MenuStats {
    totalItems: number;
    availableNow: number;
    topRated: number;
    totalCategories: number;
}
