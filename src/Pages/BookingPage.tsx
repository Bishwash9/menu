import { IconCurrencyRupeeNepalese } from '@tabler/icons-react';
import {
    Users,
    Clock,
    TrendingUp,
} from 'lucide-react';
import {
    StatCard,
    BookingContent,
    MOCK_BOOKINGS,
} from '../Features/Booking';


const BookingPage: React.FC = () => {
    const bookings = MOCK_BOOKINGS;

    const stats = {
        total: bookings.length,
        checkedIn: bookings.filter(b => b.status === 'checked-in').length,
        pending: bookings.filter(b => b.status === 'pending').length,
        revenue: bookings.filter(b => b.payment === 'paid').reduce((sum, b) => sum + b.amount, 0),
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6">
                <div className="flex gap-3">
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    title="Total Bookings"
                    value={stats.total.toString()}
                    icon={<TrendingUp size={20} />}
                    iconColor="royal"
                />
                <StatCard
                    title="Checked In"
                    value={stats.checkedIn.toString()}
                    icon={<Users size={20} />}
                    iconColor="golden"
                />
                <StatCard
                    title="Pending"
                    value={stats.pending.toString()}
                    icon={<Clock size={20} />}
                    iconColor="purple"
                />
                <StatCard
                    title="Revenue Today"
                    value={`${stats.revenue}`}
                    icon={<IconCurrencyRupeeNepalese size={20} />}
                    iconColor="green"
                />
            </div>

            {/* Booking Content */}
            <div className="grid grid-cols-1 gap-6">
                <BookingContent
                    bookings={bookings}
                />
            </div>
        </div>
    );

}

export default BookingPage;
