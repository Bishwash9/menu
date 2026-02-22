export interface MenuItem{
    id: number;
    business_id: number;
    business_name: string;
    category_id: number;
    category_name: string; // The UI needs this
    name: string;
    description: string;
    price: string;         // The API sends this as a string
    image: string | null;
    spice_level_id: number;
    spice_level_name: string; // The UI needs this
    preparation_time: number;
    is_available: boolean;
    created_at: string;
    updated_at: string;

}

export interface menuResponse{
    data: MenuItem[];
    message?: string;
}