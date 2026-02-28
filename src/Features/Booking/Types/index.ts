export {type Booking} from '../../../Types/booking';
export {type BookingResponse} from '../../../Types/booking';

export interface BookingStats{
    total: number;
    checkedIn: number;
    pending: number;
    revenue: number;
}