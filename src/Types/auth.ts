export interface AuthTokens{
    accessToken: string;
    refreshToken: string;
}

export interface StaffUser{
    id: string;
    business_uid: string;
    name: string;
    role: 'staff';
    shift: string;
    status: string;
}

export interface BusinessUser{
    id: string;
    business_uid: string;
    name: string;
    role: 'admin';
    username: string;
    email: string;
}

export type User = StaffUser | BusinessUser;

export interface LoginResponse{
    tokens: AuthTokens;
    message: string;
    error: string | null;
    user: User;
}