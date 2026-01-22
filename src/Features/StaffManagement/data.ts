import type { Employee } from './Types';

export const MOCK_EMPLOYEES: Employee[] = [
    {
        id: 'E001',
        name: 'John Doe',
        email: 'john@hotel.com',
        phone: '+91 9876543210',
        role: 'Manager',
        shift: 'Morning Shift',
        status: 'Active',
        salary: 50000,
        joinDate: '2022-01-15',
        avatarColor: 'royal',
    },
    {
        id: 'E002',
        name: 'Jane Smith',
        email: 'jane@hotel.com',
        phone: '+91 9876543211',
        role: 'Receptionist',
        shift: 'Morning Shift',
        status: 'Active',
        salary: 25000,
        joinDate: '2022-03-20',
        avatarColor: 'golden',
    },
    {
        id: 'E003',
        name: 'Mike Johnson',
        email: 'mike@hotel.com',
        phone: '+91 9876543212',
        role: 'Chef',
        shift: 'Evening Shift',
        status: 'Active',
        salary: 35000,
        joinDate: '2022-02-10',
        avatarColor: 'royal',
    },
    {
        id: 'E004',
        name: 'Sarah Wilson',
        email: 'sarah@hotel.com',
        phone: '+91 9876543213',
        role: 'Housekeeping',
        shift: 'Morning Shift',
        status: 'On Leave',
        salary: 15000,
        joinDate: '2022-05-15',
        avatarColor: 'golden',
    },
    {
        id: 'E005',
        name: 'Robert Brown',
        email: 'robert@hotel.com',
        phone: '+91 9876543214',
        role: 'Security',
        shift: 'Night Shift',
        status: 'Active',
        salary: 20000,
        joinDate: '2022-04-01',
        avatarColor: 'royal',
    },
];

export const ROLES: EmployeeRole[] = ['Manager', 'Chef', 'Receptionist', 'Housekeeping', 'Security', 'Waiter'];
export const SHIFTS: ShiftType[] = ['Morning Shift', 'Evening Shift', 'Night Shift'];
export const STATUSES: EmployeeStatus[] = ['Active', 'On Leave', 'Inactive'];

import type { EmployeeRole, ShiftType, EmployeeStatus } from './Types';
