export type BookingStatus = 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface Booking {
    id: string;
    guest: {
        name: string;
        id: string;
        avatarColor: string; // 'royal' or 'golden'
    };
    room: {
        number: string;
        type: string;
    };
    checkIn: string; // ISO Date
    checkOut: string; // ISO Date
    nights: number;
    amount: number;
    status: BookingStatus;
    payment: PaymentStatus;
}
