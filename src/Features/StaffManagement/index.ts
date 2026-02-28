export { StaffStatCard } from './Components/StaffStatCard';
export { StaffModal } from './Components/StaffModal';
export { StaffContent } from './Components/StaffContent';
export { type Staff as Employee } from '../../Types/staff';
export { type StaffResponse } from '../../Types/staff';

export interface StaffStats {
    totalStaff: number;
    active: number;
    onLeave: number;
    totalRoles: number;
}