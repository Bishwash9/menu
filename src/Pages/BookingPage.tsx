import { useState, useEffect } from 'react';
import { IconCurrencyRupeeNepalese } from '@tabler/icons-react';
import { Users, Clock, TrendingUp } from 'lucide-react';
import { StatCard, BookingContent, type Booking } from '../Features/Booking';
import { bookingService } from '../Services/bookingService';
import { useAuth } from '../Context/AuthContext';

const BookingPage: React.FC = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch bookings data on component mount
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        if (!user?.business_id) {
            setError('Business ID not found');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const response = await bookingService.getBookings(user.business_id);
            setBookings(response || []);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch bookings');
            console.error('Error fetching bookings:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate stats from actual data
    const stats = {
        total: bookings.length,
        checkedIn: bookings.filter(b => 
            b.status_name.toLowerCase().trim() === 'checked in' || 
            b.status_name.toLowerCase().trim() === 'checked-in'
        ).length,
        pending: bookings.filter(b => 
            b.status_name.toLowerCase().trim() === 'pending'
        ).length,
        revenue: bookings.length * 1000, // TODO: Add actual revenue calculation when available
    };

    return (
        <div className="space-y-6">
         
            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 px-4 py-3 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

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
                {isLoading ? (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                        <p className="text-slate-500">Loading bookings...</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                        <p className="text-slate-500">No bookings yet</p>
                    </div>
                ) : (
                    <BookingContent bookings={bookings} />
                )}
            </div>
        </div>
    );
};

export default BookingPage;