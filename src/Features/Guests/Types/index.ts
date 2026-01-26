export type GuestStatus = 'Checked In' | 'Checked Out' | 'Reserved' | 'VIP';

export interface Guest {
    id: string;
    name: string;
    email: string;
    phone: string;
    roomNumber?: string;
    status: GuestStatus;
    checkIn?: string;
    checkOut?: string;
    totalStays: number;
    totalSpent: number;
    idType: string;
    idNumber: string;
    nationality: string;
    address?: string;
    notes?: string;
}

export interface GuestStats {
    totalGuests: number;
    checkedIn: number;
    reservations: number;
    vipGuests: number;
}
