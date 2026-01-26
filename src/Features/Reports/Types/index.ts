export interface RevenueData {
    month: string;
    thisYear: number;
    lastYear: number;
}

export interface CategoryRevenue {
    category: string;
    amount: number;
    percentage: number;
    color: string;
    icon: string;
}

export interface ReportStats {
    totalRevenue: number;
    occupancyRate: number;
    totalExpenses: number;
    netProfit: number;
    revenueChange: number;
    occupancyChange: number;
    expensesChange: number;
    profitChange: number;
}

export type TimeFilter = 'Today' | 'This Week' | 'This Month' | 'This Quarter' | 'This Year';
