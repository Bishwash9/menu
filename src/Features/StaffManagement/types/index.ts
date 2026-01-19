export type EmployeeRole = 'Manager' | 'Chef' | 'Receptionist' | 'Housekeeping' | 'Security' | 'Waiter';
export type ShiftType = 'Morning Shift' | 'Evening Shift' | 'Night Shift';
export type EmployeeStatus = 'Active' | 'On Leave' | 'Inactive';

export interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: EmployeeRole;
    shift: ShiftType;
    status: EmployeeStatus;
    salary: number;
    joinDate: string;
    avatar?: string;
    avatarColor?: string;
}

export interface StaffStats {
    totalStaff: number;
    active: number;
    onLeave: number;
    totalRoles: number;
}
