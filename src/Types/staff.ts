export interface Staff{
    id: number;
    business_id: number;
    business_name: string;
    name: string;
    phone: string;
    role: number;
    role_name: string;
    shift: number;
    shift_name: string;
    status: number;
    status_name: string;
    created_at: string;
    updated_at: string;
}

export interface StaffResponse {
    data: Staff[];
}