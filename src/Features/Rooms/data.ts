import type { Room, RoomStatus, RoomType, FloorType } from './Types';

export const ROOM_STATUSES: RoomStatus[] = ['Available', 'Occupied', 'Cleaning', 'Maintenance'];
export const ROOM_TYPES: RoomType[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];
export const FLOORS: FloorType[] = ['1st floor', '2nd floor', '3rd floor', '4th floor'];
export const AMENITIES = ['TV', 'WiFi', 'AC', 'Mini Bar', 'Balcony', 'Sea View', 'Room Service', 'Safe'];

export const initialRooms: Room[] = [
    {
        id: '1',
        roomNumber: '101',
        type: 'Single',
        floor: '1st floor',
        status: 'Available',
        price: 100,
        amenities: ['TV', 'WiFi', 'AC'],
        capacity: 1,
    },
    {
        id: '2',
        roomNumber: '102',
        type: 'Double',
        floor: '1st floor',
        status: 'Occupied',
        price: 150,
        amenities: ['TV', 'WiFi', 'AC', 'Mini Bar'],
        capacity: 2,
    },
    {
        id: '3',
        roomNumber: '201',
        type: 'Suite',
        floor: '2nd floor',
        status: 'Available',
        price: 300,
        amenities: ['TV', 'WiFi', 'AC', 'Mini Bar', 'Balcony', 'Sea View'],
        capacity: 4,
    },
    {
        id: '4',
        roomNumber: '202',
        type: 'Deluxe',
        floor: '2nd floor',
        status: 'Cleaning',
        price: 200,
        amenities: ['TV', 'WiFi', 'AC', 'Mini Bar', 'Room Service'],
        capacity: 2,
    },
    {
        id: '5',
        roomNumber: '301',
        type: 'Single',
        floor: '3rd floor',
        status: 'Maintenance',
        price: 100,
        amenities: ['TV', 'WiFi', 'AC'],
        capacity: 1,
    },
];
