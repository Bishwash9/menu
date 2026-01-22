import React, { useState } from 'react';
import { Plus, Users, UserCheck, CalendarCheck, Star } from 'lucide-react';
import { SideBar } from '../Components/Layout/Sidebar';
import { GuestModal, GuestContent, initialGuests } from '../Features/Guests';
import type { Guest, GuestStats } from '../Features/Guests/Types';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor }) => (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-xl ${iconBgColor}`}>
                {icon}
            </div>
        </div>
    </div>
);

const GuestsPage: React.FC = () => {
    const [guests, setGuests] = useState<Guest[]>(initialGuests);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [guestStatusFilter, setGuestStatusFilter] = useState<'All' | 'Checked In' | 'Reserved' | 'VIP' | 'Checked Out'>('All');

    // Calculate stats
    const stats: GuestStats = {
        totalGuests: guests.length,
        checkedIn: guests.filter(g => g.status === 'Checked In').length,
        reservations: guests.filter(g => g.status === 'Reserved').length,
        vipGuests: guests.filter(g => g.status === 'VIP').length,
    };

    const handleAddGuest = () => {
        setModalMode('add');
        setSelectedGuest(null);
        setIsModalOpen(true);
    };

    const handleEditGuest = (guest: Guest) => {
        setModalMode('edit');
        setSelectedGuest(guest);
        setIsModalOpen(true);
    };

    const handleViewGuest = (guest: Guest) => {
        setModalMode('edit');
        setSelectedGuest(guest);
        setIsModalOpen(true);
    };

    const handleDeleteGuest = (guestId: string) => {
        setGuests(guests.filter(g => g.id !== guestId));
    };

    const handleSaveGuest = (guestData: Omit<Guest, 'id'> | Guest) => {
        if ('id' in guestData) {
            setGuests(guests.map(g => g.id === guestData.id ? guestData : g));
        } else {
            const newGuest: Guest = {
                ...guestData,
                id: Date.now().toString(),
            };
            setGuests([...guests, newGuest]);
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <SideBar/>
            
            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200"></div>
                
                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#002366]">Guest Management</h1>
                            <p className="text-slate-500">Manage guest information and reservations</p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <div className="flex gap-2 flex-wrap">
                                {['All', 'Checked In', 'Reserved', 'VIP', 'Checked Out'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setGuestStatusFilter(status as any)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            guestStatusFilter === status
                                                ? 'bg-[#002366] text-white'
                                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleAddGuest}
                                className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#b8962e] transition-colors shadow-sm"
                            >
                                <Plus size={18} />
                                Add Guest
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatCard
                            title="Total Guests"
                            value={stats.totalGuests}
                            icon={<Users size={24} className="text-[#002366]" />}
                            iconBgColor="bg-[#002366]/10"
                        />
                        <StatCard
                            title="Checked In"
                            value={stats.checkedIn}
                            icon={<UserCheck size={24} className="text-green-600" />}
                            iconBgColor="bg-green-100"
                        />
                        <StatCard
                            title="Reservations"
                            value={stats.reservations}
                            icon={<CalendarCheck size={24} className="text-blue-600" />}
                            iconBgColor="bg-blue-100"
                        />
                        <StatCard
                            title="VIP Guests"
                            value={stats.vipGuests}
                            icon={<Star size={24} className="text-[#D4AF37]" />}
                            iconBgColor="bg-[#D4AF37]/20"
                        />
                    </div>

                    {/* Guest Content */}
                    <GuestContent
                        guests={guestStatusFilter === 'All' ? guests : guests.filter(g => g.status === guestStatusFilter)}
                        onView={handleViewGuest}
                        onEdit={handleEditGuest}
                        onDelete={handleDeleteGuest}
                    />
                </div>
            </main>

            {/* Modal */}
            <GuestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveGuest}
                guest={selectedGuest}
                mode={modalMode}
            />
        </div>
    );
};

export default GuestsPage;
