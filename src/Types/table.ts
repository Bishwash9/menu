export interface Table {
    id: number;
    business_id: number;
    business_name: string;
    table_number: number;
    location: string;
    status_id: number;
    status_name: string;
    reserved_by: number | null;
    created_at: string;
    updated_at: string;
    seats: number;
}

export interface TableResponse {
    data: Table[];
}