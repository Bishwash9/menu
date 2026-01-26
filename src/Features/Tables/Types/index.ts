export type TableStatus = 'Available' | 'Occupied' | 'Reserved';
export type TableArea = 'Main Hall' | 'Garden' | 'Rooftop' | 'Private';

export interface Table {
    id: string;
    tableNumber: string;
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
    occupied: number;
    reserved: number;
    totalCapacity: number;
}
