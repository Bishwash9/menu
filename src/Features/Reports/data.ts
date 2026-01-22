import type { RevenueData, CategoryRevenue, ReportStats } from './Types';

export const TIME_FILTERS = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'];

export const monthlyRevenueData: RevenueData[] = [
    { month: 'J', thisYear: 850000, lastYear: 720000 },
    { month: 'F', thisYear: 920000, lastYear: 780000 },
    { month: 'M', thisYear: 1100000, lastYear: 890000 },
    { month: 'A', thisYear: 980000, lastYear: 850000 },
    { month: 'M', thisYear: 1150000, lastYear: 920000 },
    { month: 'J', thisYear: 1320000, lastYear: 1050000 },
    { month: 'J', thisYear: 1245000, lastYear: 1100000 },
    { month: 'A', thisYear: 1180000, lastYear: 980000 },
    { month: 'S', thisYear: 1050000, lastYear: 890000 },
    { month: 'O', thisYear: 1290000, lastYear: 1020000 },
    { month: 'N', thisYear: 1380000, lastYear: 1150000 },
    { month: 'D', thisYear: 1520000, lastYear: 1280000 },
];

export const categoryRevenue: CategoryRevenue[] = [
    { category: 'Room Bookings', amount: 850000, percentage: 68, color: '#002366', icon: '🏨' },
    { category: 'Restaurant', amount: 280000, percentage: 22, color: '#D4AF37', icon: '🍽️' },
    { category: 'Cafe', amount: 75000, percentage: 6, color: '#10B981', icon: '☕' },
    { category: 'Other Services', amount: 40000, percentage: 4, color: '#8B5CF6', icon: '🎯' },
];

export const initialStats: ReportStats = {
    totalRevenue: 1245000,
    occupancyRate: 78,
    totalExpenses: 420000,
    netProfit: 825000,
    revenueChange: 15.5,
    occupancyChange: 5.2,
    expensesChange: -2.1,
    profitChange: 22.4,
};

export const topPerformingRooms = [
    { room: 'Suite 301', bookings: 28, revenue: 280000, rating: 4.9 },
    { room: 'Deluxe 205', bookings: 32, revenue: 192000, rating: 4.7 },
    { room: 'Double 102', bookings: 45, revenue: 157500, rating: 4.6 },
    { room: 'Suite 402', bookings: 22, revenue: 220000, rating: 4.8 },
];

export const recentTransactions = [
    { id: 'TXN001', guest: 'John Doe', type: 'Room Booking', amount: 15000, date: '2026-01-20', status: 'Completed' },
    { id: 'TXN002', guest: 'Jane Smith', type: 'Restaurant', amount: 3200, date: '2026-01-20', status: 'Completed' },
    { id: 'TXN003', guest: 'Mike Johnson', type: 'Room Service', amount: 1500, date: '2026-01-20', status: 'Pending' },
    { id: 'TXN004', guest: 'Sarah Wilson', type: 'Room Booking', amount: 8500, date: '2026-01-19', status: 'Completed' },
];
