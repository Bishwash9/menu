import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Home,
  Users,
  Settings,
  Coffee,
  CreditCard,
  SquareMenu,
  FileText,
  BarChart3,
  Utensils,
  UserCheck,
  Shield,
  Wallet
} from 'lucide-react';

// Common Icons (Lucide-style SVGs)
const Icons = {
  Dashboard: <LayoutDashboard size={20} />,
  Bookings: <CalendarDays size={20} />,
  Rooms: <Home size={20} />,
  Users: <Users size={20} />,
  Settings: <Settings size={20} />,
  Menu: <SquareMenu size={20} />,
  Orders: <Coffee size={20} />,
  Billing: <CreditCard size={20} />,
  FileText: <FileText size={20} />,
  Reports: <BarChart3 size={20} />,
  Tables: <Utensils size={20} />,
  Guests: <UserCheck size={20} />,
  Roles: <Shield size={20} />,
  Wallet: <Wallet size={20}/>,
};

export type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  subItems?: SidebarItem[];
  path?: string;
  defaultType?: 'room' | 'table';
};

export type Role = 'user' | 'admin' | 'staff' | 'housekeeping' ;

export const SIDEBAR_CONFIG: Record<Role, SidebarItem[]> = {
  admin: [
    { label: 'Dashboard', icon: Icons.Dashboard, path: '/dashboard ' },
    { label: 'Rooms', icon: Icons.Rooms, path: '/rooms' },
    { label: 'Menu-Management', icon: Icons.Menu, path: "/menu-management" },
    { label: 'Staff-Management', icon: Icons.Users, path: "/staff-management" },
    { label: "Roles & Access", icon: Icons.Roles, path: "/roles-access" },
    { label:  "Subscription", icon: Icons.Wallet ,path: "/subscription"},
    { label: 'Settings', icon: Icons.Settings, path: '/settings' },
  ],
  user: [
    { label: 'Dashboard', icon: Icons.Dashboard, path: '/dashboard' },
    { label: 'Menu', icon: Icons.Menu, path: '/menu' },
    { label: 'Profile', icon: Icons.Users },
    { label: 'Settings', icon: Icons.Settings },
    { label: 'Add Orders', icon: Icons.Orders, path: '/orderForm',defaultType :'table' },
    { label: 'New Booking', icon: Icons.Bookings, path: "/orderForm", defaultType: 'room' }
  ],
  staff: [
    { label: 'Dashboard', icon: Icons.Dashboard, path: '/dashboard' },
    { label: 'Cafe & Orders', icon: Icons.Orders, path: '/cafe-orders' },
    { label: 'Tables', icon: Icons.Tables, path: '/tables' },
    { label: 'Guests', icon: Icons.Guests, path: '/guests' },
    { label: 'Bookings', icon: Icons.Bookings, path: '/bookings'},

    
  
  ],
  housekeeping : [
    {label : 'Dashboard', icon: Icons.Dashboard, path:'/dashboard'},
  ]



};