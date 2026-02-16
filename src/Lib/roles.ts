export type Role = 'user' | 'admin' | 'reception' | 'housekeeping' | '' | 'company'; 

export const ROLES = {
    USER : 'user' as Role,
    ADMIN : 'admin' as Role,
    RECEPTION : 'reception' as Role,
    HOUSEKEEPING : 'housekeeping' as Role,
    COMPANY: 'company' as Role
};