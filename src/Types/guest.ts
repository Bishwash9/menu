export interface Guest {
    id: number;
    business_id: number;
    name: string;
    phone: string;
    verify_id: number;
    verify_name: string;
    status_id: number;
    status_name: string;
    created_at: string;
    updated_at: string;
}

export interface GuestResponse{
    data: Guest[];
}