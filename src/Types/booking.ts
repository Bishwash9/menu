export interface Booking {
    id: number;
    business_id: number;
    business_name: string;
    room_id: number;
    room_number_display: string;
    guest_id: number;
    guest_name: string;
    check_in: string;
    check_out: string;
    nights: number;
    amount: string;
    status_id: number;
    status_name: string;
    created_at: string;
    updated_at: string;
}


export interface CreateBookingRequest {
    room_number: number;   
    guest_name: string;
    check_in: string;
    check_out: string;
}

export interface CreateBookingResponse{
    message: string;
    booking: Booking;
    status: string;
}

export interface BookingResponse{
    bookings: Booking[];
}