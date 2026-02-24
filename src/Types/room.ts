export interface Room {
    id: number;
    business_id: number;
    business_name: string;
    room_number: string;
    room_type_name: string; //UI will use this instead of room_type_id
    capacity: number;
    price: string;
    floor: number;
    status_name: string;
    status_id: number;
    created_at: string;
    updated_at: string;
}

export interface RoomResponse {
    data: Room[];
}