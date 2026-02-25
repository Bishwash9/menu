export type TableStatus = 'Available' | 'Occupied' | 'Reserved' | 'Unavailable';
export type TableArea = 'Main Hall' | 'Garden' | 'Rooftop' | 'Private';

export interface Table {
    id: string;
    table_number: string;
    area: TableArea;
    status: TableStatus;
    seats: number;
    currentOrder?: {
        orderId: string;
        amount: number;
        items: number;
    };
}

export interface TableStats {
    totalTables: number;
    available: number;
    unavailable: number;
    occupied: number;
    reserved: number;
    totalCapacity: number;
}
