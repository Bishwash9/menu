import type { MenuItem } from './types';

export const MOCK_MENU_ITEMS: MenuItem[] = [
    {
        id: 'M001',
        name: 'Butter Naan',
        description: 'Soft indian flatbread cooked in clay oven',
        category: 'Breads',
        price: 60,
        dietInfo: 'Veg',
        prepTime: 10,
        rating: 4.0,
        calories: 350,
        status: 'Available',
    },
    {
        id: 'M002',
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice cooked with spiced chicken',
        category: 'Rice & Biryani',
        price: 450,
        dietInfo: 'Non-Veg',
        prepTime: 30,
        rating: 4.0,
        calories: 520,
        status: 'Available',
    },
    {
        id: 'M003',
        name: 'Paneer Tikka',
        description: 'Cottage cheese marinated and grilled',
        category: 'Appetizers',
        price: 280,
        dietInfo: 'Veg',
        prepTime: 15,
        rating: 4.5,
        calories: 280,
        status: 'Available',
    },
    {
        id: 'M004',
        name: 'Tandoori Chicken',
        description: 'Chicken marinated in yogurt and spices',
        category: 'Main Course',
        price: 520,
        dietInfo: 'Non-Veg',
        prepTime: 25,
        rating: 4.3,
        calories: 380,
        status: 'Unavailable',
    },
];

export const MENU_CATEGORIES = ['Breads', 'Rice & Biryani', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];

export const DIET_OPTIONS: Array<'Veg' | 'Non-Veg' | 'Vegan'> = ['Veg', 'Non-Veg', 'Vegan'];

export const STATUS_OPTIONS: Array<'Available' | 'Unavailable' | 'Coming Soon'> = ['Available', 'Unavailable', 'Coming Soon'];
