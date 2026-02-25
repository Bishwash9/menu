export interface Table {
    id: number;
    business_id: number;
    business_name: string;
    table_number: number;
    location: string;
    status_name: string;
    reserved_by: string | null;
    created_at: string;
    updated_at: string;
}

export interface TableResponse {
    data: Table[];
}