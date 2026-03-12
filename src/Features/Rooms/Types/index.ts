export type RoomStatus = 'Available' | 'Booked' | 'Cleaning' | 'Maintenance';
export type RoomType = 'Single' | 'Double' | 'Suite' | 'Deluxe' | 'Family';
export type FloorType = '1st floor' | '2nd floor' | '3rd floor' | '4th floor';

export interface Room {
    id: string;
    roomNumber: string;
    type: RoomType;
    floor: FloorType;
    status: RoomStatus;
    price: number;
    amenities: string[];
    capacity: number;
    description?: string;
}

export interface RoomStats {
    totalRooms: number;
    available: number;
    booked: number;
    cleaning: number;
    maintenance: number;
}
