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
  FileText
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

};

export type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  subItems?: SidebarItem[];
  path?: string;
  defaultType?: 'room' | 'table';
};

export type Role = 'user' | 'admin' | 'staff';

export const SIDEBAR_CONFIG: Record<Role, SidebarItem[]> = {
  admin: [
    { label: 'Dashboard', icon: Icons.Dashboard, path: '/' },
    { label: 'Bookings', icon: Icons.Bookings, path: '/bookings', subItems: [{ label: 'New Booking', icon: Icons.Bookings, path: "/orderForm", defaultType: 'room' }] },
    { label: 'Rooms', icon: Icons.Rooms, },
    { label: 'Users', icon: Icons.Users, subItems: [{ label: "Total Users", icon: Icons.Users }, { label: "Staff Management", icon: Icons.Users, path: "/staff-management" }] },
    { label: 'Menu', icon: Icons.Menu, subItems: [{ label: "Menu Items", icon: Icons.Menu, path: "/menu" }, { label: "Menu Management", icon: Icons.Menu, path: "/menu-management" }] },
    { label: 'Cafe & Orders', icon: Icons.Orders, subItems: [{ label: "Add Order", icon: Icons.Orders, path: "/orderForm", defaultType: 'table' }] },
    { label: 'Settings', icon: Icons.Settings, subItems: [{ label: "PAN/VAT", icon: Icons.FileText }, { label: "Email", icon: Icons.FileText }, { label: "Name", icon: Icons.Users }, { label: "Contact", icon: Icons.Billing }] },
  ],
  user: [
    { label: 'Home', icon: Icons.Dashboard, path: '/' },
    { label: 'Profile', icon: Icons.Users },
    { label: 'Settings', icon: Icons.Settings },
  ],
  staff: [
    { label: 'Dashboard', icon: Icons.Dashboard, path: '/' },
    { label: 'Kitchen', icon: Icons.Orders },
    { label: 'Guests', icon: Icons.Users },
    { label: 'Settings', icon: Icons.Settings },
  ]
};