// src/Types/menu.ts

export interface MenuItem{
    id: number;
    business_id: number;
    business_name: string;
    category_id: number;
    category_name: string; // "Veg", "Non-Veg", etc.
    name: string;
    description: string;
    price: string; // The backend sends this as a string "850.00"
    image: string | null;
    spice_level_id: number;
    spice_level_name: string;
    preparation_time: number;
    is_available: boolean;
    created_at: string;
    updated_at: string;
}

export interface MenuResponse {
    data: MenuItem[];
    message?: string;
}