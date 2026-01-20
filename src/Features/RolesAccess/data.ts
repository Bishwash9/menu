import type { Role, Permission, PermissionModule } from './types';

export const PERMISSION_MODULES: PermissionModule[] = [
    'Dashboard', 'Bookings', 'Rooms', 'Guests', 'Cafe', 'Menu', 'Tables', 'Billing', 'Staff', 'Reports', 'Settings'
];

export const allPermissions: Permission[] = [
    // Dashboard
    { id: 'dashboard.view', name: 'View Dashboard', description: 'Access to view dashboard', module: 'Dashboard' },
    
    // Bookings
    { id: 'bookings.view', name: 'View Bookings', description: 'View all bookings', module: 'Bookings' },
    { id: 'bookings.create', name: 'Create Bookings', description: 'Create new bookings', module: 'Bookings' },
    { id: 'bookings.edit', name: 'Edit Bookings', description: 'Modify existing bookings', module: 'Bookings' },
    { id: 'bookings.delete', name: 'Delete Bookings', description: 'Delete bookings', module: 'Bookings' },
    
    // Rooms
    { id: 'rooms.view', name: 'View Rooms', description: 'View all rooms', module: 'Rooms' },
    { id: 'rooms.manage', name: 'Manage Rooms', description: 'Add, edit, delete rooms', module: 'Rooms' },
    
    // Guests
    { id: 'guests.view', name: 'View Guests', description: 'View guest information', module: 'Guests' },
    { id: 'guests.manage', name: 'Manage Guests', description: 'Add, edit, delete guests', module: 'Guests' },
    
    // Cafe & Orders
    { id: 'cafe.view', name: 'View Orders', description: 'View cafe orders', module: 'Cafe' },
    { id: 'cafe.create', name: 'Create Orders', description: 'Create new orders', module: 'Cafe' },
    { id: 'cafe.manage', name: 'Manage Orders', description: 'Edit and manage orders', module: 'Cafe' },
    
    // Menu
    { id: 'menu.view', name: 'View Menu', description: 'View menu items', module: 'Menu' },
    { id: 'menu.manage', name: 'Manage Menu', description: 'Add, edit, delete menu items', module: 'Menu' },
    
    // Tables
    { id: 'tables.view', name: 'View Tables', description: 'View table layout', module: 'Tables' },
    { id: 'tables.manage', name: 'Manage Tables', description: 'Add, edit tables', module: 'Tables' },
    
    // Billing
    { id: 'billing.view', name: 'View Invoices', description: 'View billing and invoices', module: 'Billing' },
    { id: 'billing.create', name: 'Create Invoices', description: 'Generate invoices', module: 'Billing' },
    { id: 'billing.manage', name: 'Manage Billing', description: 'Full billing access', module: 'Billing' },
    
    // Staff
    { id: 'staff.view', name: 'View Staff', description: 'View staff members', module: 'Staff' },
    { id: 'staff.manage', name: 'Manage Staff', description: 'Add, edit, delete staff', module: 'Staff' },
    
    // Reports
    { id: 'reports.view', name: 'View Reports', description: 'Access reports', module: 'Reports' },
    { id: 'reports.export', name: 'Export Reports', description: 'Export report data', module: 'Reports' },
    
    // Settings
    { id: 'settings.view', name: 'View Settings', description: 'View settings', module: 'Settings' },
    { id: 'settings.manage', name: 'Manage Settings', description: 'Modify system settings', module: 'Settings' },
];

export const initialRoles: Role[] = [
    {
        id: '1',
        name: 'Admin',
        description: 'Full access to all features',
        permissions: allPermissions.map(p => p.id),
        usersCount: 2,
        color: '#002366',
        createdAt: '2026-01-01',
    },
    {
        id: '2',
        name: 'Manager',
        description: 'Manage operations and staff',
        permissions: [
            'dashboard.view', 'bookings.view', 'bookings.create', 'bookings.edit',
            'rooms.view', 'rooms.manage', 'guests.view', 'guests.manage',
            'cafe.view', 'cafe.create', 'cafe.manage', 'tables.view', 'tables.manage',
            'billing.view', 'billing.create', 'staff.view', 'reports.view', 'reports.export'
        ],
        usersCount: 3,
        color: '#D4AF37',
        createdAt: '2026-01-01',
    },
    {
        id: '3',
        name: 'Receptionist',
        description: 'Handle bookings and guest check-ins',
        permissions: [
            'dashboard.view', 'bookings.view', 'bookings.create', 'bookings.edit',
            'rooms.view', 'guests.view', 'guests.manage', 'billing.view'
        ],
        usersCount: 5,
        color: '#10B981',
        createdAt: '2026-01-05',
    },
    {
        id: '4',
        name: 'Chef',
        description: 'Kitchen and menu management',
        permissions: [
            'cafe.view', 'cafe.manage', 'menu.view', 'menu.manage'
        ],
        usersCount: 4,
        color: '#F59E0B',
        createdAt: '2026-01-10',
    },
    {
        id: '5',
        name: 'Waiter',
        description: 'Take and manage orders',
        permissions: [
            'cafe.view', 'cafe.create', 'tables.view', 'menu.view'
        ],
        usersCount: 8,
        color: '#8B5CF6',
        createdAt: '2026-01-10',
    },
];
