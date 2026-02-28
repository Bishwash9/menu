export interface Booking{
    id: number;
    business_id: number;
    business_name: string;
    room_id: number;
    room_number: string;
    guest_id: number;
    guest_name: string;
    check_in: string;
    check_out: string;
    status_id: number;
    status_name: string;
    created_at: string;
    updated_at: string;
}

export interface BookingResponse{
    bookings: Booking[];
}