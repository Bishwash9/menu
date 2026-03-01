import { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import {
    GuestContent,
    GuestModal,
    GuestStatCard,
    type Guest,
} from '../Features/Guests';
import { guestService } from '../Services/guestService';
import { useAuth } from '../Context/AuthContext';

function GuestsPage() {
    const { user } = useAuth();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch guests data on component mount
    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = async () => {
        if (!user?.business_id) {
            setError('Business ID not found');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const response = await guestService.getGuest(user.business_id);
            setGuests(response || []);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch guests');
            console.error('Error fetching guests:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate stats from actual data
    const stats = {
        totalGuests: guests.length,
        checkedIn: guests.filter(g => g.status_name.toLowerCase() === 'checked_in').length,
        checkedOut: guests.filter(g => g.status_name.toLowerCase() === 'checked_out').length,
        vip: guests.filter(g => g.status_name.toLowerCase() === 'vip').length,
    };

    const handleViewGuest = (guest: Guest) => {
        setSelectedGuest(guest);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
          

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 px-4 py-3 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <GuestStatCard
                    title="Total Guests"
                    value={stats.totalGuests}
                    icon={<Users size={20} />}
                    iconColor="royal"
                />
                <GuestStatCard
                    title="Checked In"
                    value={stats.checkedIn}
                    icon={<UserCheck size={20} />}
                    iconColor="green"
                />
                <GuestStatCard
                    title="Checked Out"
                    value={stats.checkedOut}
                    icon={<UserX size={20} />}
                    iconColor="golden"
                />
                <GuestStatCard
                    title="VIP Guests"
                    value={stats.vip}
                    icon={<TrendingUp size={20} />}
                    iconColor="purple"
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                        <p className="text-slate-500">Loading guests data...</p>
                    </div>
                ) : guests.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                        <p className="text-slate-500">No guests yet</p>
                    </div>
                ) : (
                    <GuestContent
                        guests={guests}
                        onEdit={handleViewGuest}
                        onDelete={() => {}}
                        onAddNew={() =>{
                            setSelectedGuest(null)
                            setIsModalOpen(true)
                        }}
                    />
                )}
            </div>

            {/* Guest Details Modal */}
            <GuestModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedGuest(null);
                }}
                guest={selectedGuest || undefined}
                onGuestAdded={fetchGuests}
            />
        </div>
    );
}

export default GuestsPage;