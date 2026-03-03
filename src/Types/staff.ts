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

export interface CreateStaffRequest {
    role: number;
    shift: number;
    name: string;
    phone: string;
    password: string;
}

export interface StaffResponse {
    data: Staff[];
}