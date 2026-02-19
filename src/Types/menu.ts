export interface MenuItem{
    id: number;
    name: string;
    business_id: number;
    category_id: number;
    price: number;
    description: string;
    preparation_time: number;
    image_url: string;
    is_available: boolean;
    created_at: string;
    updated_at: string;
}

export interface menuResponse{
    data: MenuItem[];
    message?: string;
}