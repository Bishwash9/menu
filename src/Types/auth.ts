export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface BusinessUser {
    business_uid: string;
    business_id: number;
    business_name: string;
    role: string;
    username: string;
    email: string;
    business_type: BusinessType;
}

export interface StaffUser{
    staff_id: number;
    name: string;
    role: string;
    shift: string;
    status: string;
    business_uid: string;
    business_id: number;
}

export interface LoginResponse {
    message: string;
    tokens: AuthTokens;
    business?: BusinessUser[]; // Make optional (?)
    staff?: StaffUser;   
}

export type BusinessType = 'Hotel' | 'Restaurant' | 'Cafe' | 'Bar' | string;