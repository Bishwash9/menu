export type Role = 'user' | 'admin' | 'staff' | 'housekeeper' | '' | 'company';

export const ROLES = {
    USER: 'user' as Role,
    ADMIN: 'admin' as Role,
    STAFF: 'staff' as Role,
    HOUSEKEEPER: 'housekeeper' as Role,
    COMPANY: 'company' as Role
};