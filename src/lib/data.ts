// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

export interface Category {
    id: string;
    name: string;
}

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isVeg?: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const CATEGORIES: Category[] = [
    { id: 'all', name: 'All' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'Burgers' },
    { id: 'noodle', name: 'Noodles' },
    { id: 'momo', name: 'Momo' },
    { id: 'salad', name: 'Salads' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'beverage', name: 'Drinks' },
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
    {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Fresh basil, tomato sauce, authentic mozzarella.',
        price: 850,
        category: 'pizza',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
        isVeg: true,
    },
    {
        id: 2,
        name: 'Spicy Hakka Noodles',
        description: 'Wok-tossed noodles with exotic spices and veggies.',
        price: 450,
        category: 'noodle',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80',
        isVeg: true,
    },
    {
        id: 3,
        name: 'Cheese Burger',
        description: 'Double juicy beef patty with melted aged cheddar.',
        price: 650,
        category: 'burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
        isVeg: false,
    },
    {
        id: 4,
        name: 'Glazed Donut',
        description: 'Classic glazed donut with a fluffy interior',
        price: 200,
        category: 'dessert',
        image: 'https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?auto=format&fit=crop&w=500&q=80',
        isVeg: true,
    },
    {
        id: 5,
        name: 'Garden Salad',
        description: 'Crispy greens, cherry tomatoes, and balsamic glaze.',
        price: 400,
        category: 'salad',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80',
        isVeg: true,
    },
    {
        id: 6,
        name: 'Pepperoni Pizza',
        description: 'Double pepperoni layers with extra mozzarella cheese.',
        price: 950,
        category: 'pizza',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80',
        isVeg: false,
    },
    {
        id: 7,
        name: 'Veggie Wrap',
        description: 'Roasted Mediterranean veggies with creamy hummus.',
        price: 450,
        category: 'salad',
        // Updated Image
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80',
        isVeg: true,
    },
    {
        id: 8,
        name: 'Chocolate Brownie',
        description: 'Rich fudge chocolate with dark chunks and walnuts.',
        price: 350,
        category: 'dessert',
        // Updated Image
        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=500&q=80',
        isVeg: true,
    },
    {
        id: 9,
        name: 'Coca Cola',
        description: 'Chilled refreshing carbonated beverage.',
        price: 100,
        category: 'beverage',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80',
        isVeg: true,
    },
    {
        id: 10,
        name: 'Chicken Wings',
        description: 'Spicy buffalo wings with blue cheese dip.',
        price: 550,
        category: 'burger', // Keeping in burger for now, or could move to sides if I added it.
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80',
        isVeg: false,
    },
    {
        id: 11,
        name: 'Mojito',
        description: 'Refreshing mojito with mint, lime, and soda.',
        price: 200,
        category: 'beverage',
        // New Item
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80',
        isVeg: true,
    },
];
