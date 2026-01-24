import { useState } from 'react';
import { SideBar } from '../Components/Layout/Sidebar';
import { X } from 'lucide-react';
import {
    Users,
    DollarSign,
    Clock,
    TrendingUp,
    Download,
} from 'lucide-react';
import {
    StatCard,
    BookingContent,
    AddBookingModal,
    MOCK_BOOKINGS,
    type Booking,
} from '../Features/Booking';
import { DashboardHeader } from '../Components/Layout';

function BookingPage() {
    const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const stats = {
        total: bookings.length,
        checkedIn: bookings.filter(b => b.status === 'checked-in').length,
        pending: bookings.filter(b => b.status === 'pending').length,
        revenue: bookings.filter(b => b.payment === 'paid').reduce((sum, b) => sum + b.amount, 0),
    };

    const handleView = (booking: Booking) => {
        setSelectedBooking(booking);
        setShowViewModal(true);
    };

    const handleEdit = (booking: Booking) => {
        setEditingBooking(booking);
        setShowEditModal(true);
    };

    const handleDelete = (bookingId: string) => {
        setBookings(bookings.filter(b => b.id !== bookingId));
    };

    const handleConfirm = (bookingId: string) => {
        setBookings(bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'confirmed' as const } : b
        ));
    };

    const handleUpdateBooking = (updatedBooking: Booking) => {
        setBookings(bookings.map(b => b.id === updatedBooking.id ? updatedBooking : b));
        setShowEditModal(false);
        setEditingBooking(null);
    };

    const handleExport = () => {
        // Create CSV content
        const headers = ['Booking ID', 'Guest', 'Room', 'Check In', 'Check Out', 'Nights', 'Amount', 'Status', 'Payment'];
        const rows = bookings.map(b => [
            b.id,
            b.guest.name,
            `${b.room.number}-${b.room.type}`,
            new Date(b.checkIn).toLocaleDateString(),
            new Date(b.checkOut).toLocaleDateString(),
            b.nights,
            `$${b.amount}`,
            b.status,
            b.payment,
        ]);

        // Create CSV string
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
        ].join('\n');

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `bookings_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <SideBar />

            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200">
                     <DashboardHeader/>
                </div>

                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6">
                        <div className="flex gap-3">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold hover:bg-[#1E3A8A]/10 transition-colors shadow-sm"
                            >
                                <Download size={18} />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatCard
                            title="Total Bookings"
                            value={stats.total.toString()}
                            trend="+12%"
                            trendUp={true}
                            icon={TrendingUp}
                            iconColor="royal"
                        />
                        <StatCard
                            title="Checked In"
                            value={stats.checkedIn.toString()}
                            trend="+5%"
                            trendUp={true}
                            icon={Users}
                            iconColor="golden"
                        />
                        <StatCard
                            title="Pending"
                            value={stats.pending.toString()}
                            trend="-3%"
                            trendUp={false}
                            icon={Clock}
                            iconColor="golden"
                        />
                        <StatCard
                            title="Revenue Today"
                            value={`$${stats.revenue}`}
                            trend="+18%"
                            trendUp={true}
                            icon={DollarSign}
                            iconColor="royal"
                        />
                    </div>

                    {/* Booking Content */}
                    <div className="grid grid-cols-1 gap-6">
                        <BookingContent
                            bookings={bookings}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onConfirm={handleConfirm}
                        />
                    </div>
                </div>
            </main>

            {/* View Modal */}
            {showViewModal && selectedBooking && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
                        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-[#1E3A8A]">Booking Details</h2>
                            <button onClick={() => setShowViewModal(false)} className="p-1">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-sm text-slate-600 font-bold">Guest Name</p>
                                <p className="text-lg text-slate-800">{selectedBooking.guest.name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Booking ID</p>
                                    <p className="text-slate-800">{selectedBooking.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Room</p>
                                    <p className="text-slate-800">{selectedBooking.room.number}-{selectedBooking.room.type}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Check In</p>
                                    <p className="text-slate-800">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Check Out</p>
                                    <p className="text-slate-800">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Nights</p>
                                    <p className="text-slate-800">{selectedBooking.nights}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Amount</p>
                                    <p className="text-lg font-bold text-[#D4AF37]">${selectedBooking.amount}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Status</p>
                                    <p className="text-slate-800 capitalize">{selectedBooking.status}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-bold">Payment</p>
                                    <p className="text-slate-800 capitalize">{selectedBooking.payment}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="flex-1 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white font-bold hover:bg-[#1E3A8A]/90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            <AddBookingModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditingBooking(null);
                }}
                onAdd={handleUpdateBooking}
                editingBooking={editingBooking || undefined}
            />
        </div>
    );
}

export default BookingPage;
