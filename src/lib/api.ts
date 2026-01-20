import { invoke } from '@tauri-apps/api/core';

// Generic response type
export interface ApiError {
  error: string;
}

// Guest Types
export interface Guest {
  id: number;
  business_id: number;
  name: string;
  phone: string;
  verify_id: number;
  status_id: number;
  created_at: string;
  updated_at: string;
}

export interface GuestCreate {
  business_id: number;
  name: string;
  phone: string;
  verify_id: number;
  status_id: number;
}

export interface GuestUpdate {
  name?: string;
  phone?: string;
  status_id?: number;
}

// Food Item Types
export interface FoodItem {
  id: number;
  business_id: number;
  category_id: number;
  name: string;
  description?: string;
  price: number;
  preparation_time: number;
  spice_level_id?: number;
  is_available: boolean;
  image_url?: string;
}

export interface FoodItemCreate {
  business_id: number;
  category_id: number;
  name: string;
  description?: string;
  price: number;
  preparation_time: number;
  spice_level_id?: number;
  is_available?: boolean;
  image_url?: string;
}

export interface FoodItemUpdate {
  name?: string;
  description?: string;
  price?: number;
  status_id?: number; // Backend maps this to is_available logic sometimes, checking rust struct
  is_available?: boolean;
}

// Table Types
export interface Table {
  id: number;
  business_id: number;
  table_number: string;
  capacity?: number;
  location?: string;
  status_id: number;
  reserved_by?: number;
  qr_code?: string;
}

export interface TableCreate {
  business_id: number;
  table_number: string;
  capacity?: number;
  location?: string;
  status_id: number;
  reserved_by?: number;
  qr_code?: string;
}

export interface TableUpdate {
  status_id?: number;
  reserved_by?: number;
}

// Order Types
export interface Order {
  id?: number; // Optional because create response might be different or includes ID
  business_id: number;
  order_number: string;
  table_id: number;
  guest_id: number;
  order_type_id: number;
  status_id: number;
  subtotal: number;
  tax: number;
  discount: number;
  total_amount: number;
  notes?: string;
  served_by: number;
}

export interface OrderCreate {
  business_id: number;
  order_number: string;
  table_id: number;
  guest_id: number;
  order_type_id: number;
  status_id: number;
  subtotal: number;
  tax: number;
  discount: number;
  total_amount: number;
  served_by: number;
  notes?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  food_item_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  status_id: number;
  special_instructions?: string;
}

export interface OrderItemCreate {
  order_id: number;
  food_item_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  status_id: number;
  special_instructions?: string;
}

// Staff Types
export interface Staff {
  id: number;
  business_id: number;
  role_id: number;
  shift_id: number;
  status_id: number;
  name: string;
  phone: string;
}

export interface StaffCreate {
  business_id: number;
  role_id: number;
  shift_id: number;
  status_id: number;
  name: string;
  phone: string;
  password?: string;
}

// --- API FUNCTIONS ---

// Guests
export const getGuests = async (guestId?: number): Promise<Guest[]> => {
  return await invoke('get_guests', { guestId });
};

export const createGuest = async (data: GuestCreate): Promise<any> => {
  return await invoke('create_guest', { data });
};

export const updateGuest = async (id: number, data: GuestUpdate): Promise<any> => {
  return await invoke('update_guest', { id, data });
};

export const deleteGuest = async (id: number): Promise<any> => {
  return await invoke('delete_guest', { id });
};

// Food Items
export const getFoodItems = async (foodItemId?: number): Promise<FoodItem[]> => {
  return await invoke('get_food_items', { foodItemId });
};

export const createFoodItem = async (data: FoodItemCreate): Promise<any> => {
  return await invoke('create_food_item', { data });
};

export const updateFoodItem = async (id: number, data: FoodItemUpdate): Promise<any> => {
  return await invoke('update_food_item', { id, data });
};

export const deleteFoodItem = async (id: number): Promise<any> => {
  return await invoke('delete_food_item', { id });
};

// Tables
export const getTables = async (tableId?: number): Promise<Table[]> => {
  return await invoke('get_tables', { tableId });
};

export const createTable = async (data: TableCreate): Promise<any> => {
  return await invoke('create_table', { data });
};

export const updateTable = async (id: number, data: TableUpdate): Promise<any> => {
  return await invoke('update_table', { id, data });
};

export const deleteTable = async (id: number): Promise<any> => {
  return await invoke('delete_table', { id });
};

// Orders
export const getOrders = async (tableId?: number): Promise<Order[]> => {
  return await invoke('get_orders', { tableId });
};

export const createOrder = async (data: OrderCreate): Promise<any> => {
  return await invoke('create_order', { data });
};

// Order Items
export const getOrderItems = async (orderId?: number): Promise<OrderItem[]> => {
  return await invoke('get_order_items', { orderId });
};

export const createOrderItem = async (data: OrderItemCreate): Promise<any> => {
  return await invoke('create_order_item', { data });
};

export const updateOrderItem = async (id: number, data: any): Promise<any> => {
  return await invoke('update_order_item', { id, data });
};

export const deleteOrderItem = async (id: number): Promise<any> => {
  return await invoke('delete_order_item', { id });
};

// Staff
export const getStaff = async (staffId?: number): Promise<Staff[]> => {
  return await invoke('get_staff', { staffId });
};

export const createStaff = async (data: StaffCreate): Promise<any> => {
  return await invoke('create_staff', { data });
};

export const updateStaff = async (id: number, data: any): Promise<any> => {
  return await invoke('update_staff', { id, data });
};

export const deleteStaff = async (id: number): Promise<any> => {
  return await invoke('delete_staff', { id });
};

// Auth
export const getUsers = async (): Promise<any> => {
  return await invoke('get_users');
};
