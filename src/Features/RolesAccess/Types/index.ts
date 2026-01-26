export interface Permission {
    id: string;
    name: string;
    description: string;
    module: string;
}

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
    usersCount: number;
    color: string;
    createdAt: string;
}

export type PermissionModule = 'Dashboard' | 'Bookings' | 'Rooms' | 'Guests' | 'Cafe' | 'Menu' | 'Tables' | 'Billing' | 'Staff' | 'Reports' | 'Settings';
