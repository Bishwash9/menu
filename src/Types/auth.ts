export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface BusinessUser {
    business_uid: string;
    business_id: number;
    name: string;
    role: string;
    username: string;
    email: string;
}

export interface LoginResponse {
    message: string;
    tokens: AuthTokens;
    business: BusinessUser;
}