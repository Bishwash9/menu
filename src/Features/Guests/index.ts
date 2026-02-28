// export type {Guest} from './Types';
// export type {GuestStats} from './Types';
// export type {GuestStatus} from './Types';
export {GuestModal} from './Components/GuestModal';
export {GuestContent} from './Components/GuestContent';
export { type Guest } from '../../Types/guest';
export { type GuestResponse } from '../../Types/guest';
export { GuestStatCard } from './Components/GuestStatCard';

export interface GuestStats {
    totalGuests: number;
    checkedIn: number;
    checkedOut: number;
    vip: number;
}