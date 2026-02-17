export type Role = 'user' | 'admin' | 'staff' | 'housekeeping' | '' | 'company';

export const ROLES = {
    USER: 'user' as Role,
    ADMIN: 'admin' as Role,
    STAFF: 'staff' as Role,
    HOUSEKEEPING: 'housekeeping' as Role,
    COMPANY: 'company' as Role
};