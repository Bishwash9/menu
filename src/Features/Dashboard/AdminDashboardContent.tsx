// src/Features/Dashboard/AdminDashboardContent.tsx

import { useState, useEffect } from 'react';
import Banner from '../../assets/Banner.svg';
import {
  BedDouble,
  Users,
  DollarSign,
  CalendarCheck,
  CalendarX,

  Search,
  Eye
} from 'lucide-react';

// Types
type ModalType = 'none' | 'newBooking' | 'checkIn' | 'checkOut' | 'addGuest' | 'viewBooking' | 'editBooking';
type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';

interface Booking {
  id: string;
  guestId: string;
  guestName: string;
  roomId: string;
  room: string | { id: string; name: string };
  checkIn: string;
  checkOut: string;
  nights: number;
  status: BookingStatus;
  amount: string;
  payment: string;
}

// Initial Mock Data
const initialBookings: Booking[] = [
  {
    id: 'BK001',
    guestId: 'G123',
    guestName: 'John Doe',
    roomId: '101',
    room: 'Room 101',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    nights: 2,
    status: 'confirmed',
    amount: '5000',
    payment: 'paid'
  },
  {
    id: 'BK002',
    guestId: 'G124',
    guestName: 'Jane Smith',
    roomId: '205',
    room: 'Room 205',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 1).toISOString().split('T')[0],
    nights: 1,
    status: 'checked-in',
    amount: '3000',
    payment: 'paid'
  },
  {
    id: 'BK003',
    guestId: 'G125',
    guestName: 'Mike Johnson',
    roomId: '301',
    room: 'Room 301',
    checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    nights: 2,
    status: 'pending',
    amount: '4500',
    payment: 'pending'
  }
];

function AdminDashboardContent() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookings, setShowBookings] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const [newBookingForm, setNewBookingForm] = useState({
    guestName: '',
    phone: '',
    email: '',
    room: '',
    checkIn: '',
    checkOut: '',
    amount: '',
  });

  const availableRooms = ['101', '102', '110', '203', '205', '301', '308', '401', '405'];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // CRUD Operations
  const handleCreateBooking = () => {
    if (!newBookingForm.guestName || !newBookingForm.room || !newBookingForm.checkIn || !newBookingForm.checkOut) {
      alert('Please fill all required fields');
      return;
    }

    const newBooking: Booking = {
      id: `BK${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      guestId: `G${Math.floor(Math.random() * 1000)}`,
      guestName: newBookingForm.guestName,
      roomId: newBookingForm.room,
      room: `Room ${newBookingForm.room}`,
      checkIn: newBookingForm.checkIn,
      checkOut: newBookingForm.checkOut,
      nights: Math.ceil((new Date(newBookingForm.checkOut).getTime() - new Date(newBookingForm.checkIn).getTime()) / (1000 * 3600 * 24)),
      status: 'pending',
      amount: newBookingForm.amount || '0',
      payment: 'pending'
    };

    setBookings([...bookings, newBooking]);
    setNewBookingForm({ guestName: '', phone: '', email: '', room: '', checkIn: '', checkOut: '', amount: '' });
    setActiveModal('none');
  };

  const handleUpdateBooking = () => {
    if (!selectedBooking) return;
    setBookings(bookings.map(b => b.id === selectedBooking.id ? selectedBooking : b));
    setSelectedBooking(null);
    setActiveModal('none');
  };

  const handleConfirmBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
  };

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Derived Statistics
  const roomStats = {
    total: 50,
    occupied: bookings.filter(b => b.status === 'checked-in').length,
    available: 50 - bookings.filter(b => b.status === 'checked-in').length,
    cleaning: 3,
    occupancyRate: Math.round((bookings.filter(b => b.status === 'checked-in').length / 50) * 100)
  };

  const todayActivity = {
    checkIns: bookings.filter(b => b.status === 'checked-in').length,
    checkOuts: bookings.filter(b => b.status === 'checked-out').length,
    newBookings: bookings.length,
    cancellations: bookings.filter(b => b.status === 'cancelled').length
  };

  const totalRevenue = bookings.reduce((acc, current) => acc + (parseFloat(current.amount) || 0), 0);

  const recentBookingsList = bookings;
  const todayCheckIns = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').slice(0, 4);
  const todayCheckOuts = bookings.filter(b => b.status === 'checked-out' || (b.status === 'checked-in' && b.checkOut === new Date().toISOString().split('T')[0])).slice(0, 3);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'checked-in': return 'bg-blue-100 text-blue-700';
      case 'checked-out': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col bg-white overflow-hidden font-light">
      {/* Soft Viewport Header Section */}
      <div className="relative w-full h-[25vh] shrink-0 overflow-hidden border-b border-slate-100">
        <img
          src={Banner}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
          alt="Background"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent z-10" />

        <div className="relative z-20 h-full flex flex-col justify-center px-[5vw]">
          <div className="flex items-center gap-[1vw] mb-[1.5vh]">
            <span className="text-[#002366] text-[0.8vw] font-light uppercase tracking-widest">
              Admin Panel
            </span>
            <div className="h-px w-[5vw] bg-[#002366]/10" />
          </div>

          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-[3vw] font-light text-[#002366] leading-none tracking-tight mb-[1vh]">
                Welcome back, <span className="font-normal">Admin</span>
              </h2>
              <p className="text-[1.1vw] text-slate-500 font-light max-w-[35vw]">
                Oversee operations, manage performance, and guest happiness.
              </p>
            </div>

            <div className="text-right pb-[1vh]">
              <div className="text-[3.5vw] font-light text-[#002366] leading-none mb-[0.5vh] tabular-nums">
                {formatTime(currentTime).split(' ')[0]}
                <span className="text-[1.2vw] text-slate-400 ml-[0.5vw]">{formatTime(currentTime).split(' ')[1]}</span>
              </div>
              <p className="text-[0.9vw] text-slate-400 font-light uppercase tracking-widest">
                {formatDate(currentTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Viewport Managed Layout */}
      <div className="flex-1  overflow-y-auto p-[2.5vw] bg-slate-50/30">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2vw] mb-6">
          <StatusCard
            title="Available Rooms"
            value={roomStats.available}
            icon={<BedDouble className="w-[1.4vw] h-[1.4vw]" />}
            color="green"
          />
          <StatusCard
            title="Occupied Rooms"
            value={roomStats.occupied}
            icon={<Users className="w-[1.4vw] h-[1.4vw]" />}
            color="royal"
          />
          <StatusCard
            title="Today's Check-ins"
            value={todayActivity.checkIns}
            icon={<CalendarCheck className="w-[1.4vw] h-[1.4vw]" />}
            color="purple"
          />
          <StatusCard
            title="Today's Revenue"
            value={totalRevenue}
            isCurrency
            icon={<DollarSign className="w-[1.4vw] h-[1.4vw]" />}
            color="orange"
          />
        </div>

        {/* Show Recent Bookings Button */}
        <div className="flex justify-end mb-6 mt-6">
          <button
            onClick={() => setShowBookings(true)}
            className="px-6 py-2.5 bg-[#002366] text-white rounded-xl font-bold hover:bg-[#001a4d] transition-all shadow-md flex items-center gap-2"
          >
            <Eye size={18} className='hover:text-[#D4AF37]' />
            Show Recent Bookings
          </button>
        </div>

        {/* Bookings Modal */}
        {showBookings && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100">
              <div className="grid grid-cols-3 items-center p-6 border-b border-gray-100 bg-white">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Recent Bookings</h3>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-xs">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-700 w-full transition-all"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowBookings(false)}
                    className="px-6 py-2.5 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-900 transition-all text-sm shadow-sm border border-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6 bg-gray-50/30">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left text-xs font-bold text-gray-500 uppercase px-6 py-4 tracking-wider">Guest</th>
                        <th className="text-left text-xs font-bold text-gray-500 uppercase px-6 py-4 tracking-wider">Room</th>
                        <th className="text-left text-xs font-bold text-gray-500 uppercase px-6 py-4 tracking-wider">Check-in</th>
                        <th className="text-right text-xs font-bold text-gray-500 uppercase px-6 py-4 tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentBookingsList
                        .filter(b =>
                          b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.roomId.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((booking) => (
                          <tr key={booking.id} className="hover:bg-orange-50/30 transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                                  {booking.guestName.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">{booking.guestName}</p>
                                  <p className="text-xs text-gray-400 font-medium">{booking.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-900">
                                  {typeof booking.room === 'string' ? booking.room : booking.room.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600 font-medium">
                                {new Date(booking.checkIn).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <span className="text-base font-bold text-gray-900">RS{booking.amount}</span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Today's Activity */}
        <div className="space-y-5">
          {/* Check-ins */}
          <div className="bg-white border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CalendarCheck size={18} className="text-green-500" />
                <h3 className="font-semibold text-gray-900">Today's Check-ins</h3>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                {todayCheckIns.length} guests
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {todayCheckIns.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-medium text-sm">{item.guestName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.guestName}</p>
                      <p className="text-xs text-gray-400">Room {typeof item.room === 'string' ? item.room : item.room.name}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              ))}
              {todayCheckIns.length === 0 && <p className="p-4 text-sm text-gray-500 text-center">No check-ins today</p>}
            </div>
          </div>

          {/* Check-outs */}
          <div className="bg-white border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CalendarX size={18} className="text-orange-500" />
                <h3 className="font-semibold text-gray-900">Today's Check-outs</h3>
              </div>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                {todayCheckOuts.length} guests
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {todayCheckOuts.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-700 font-medium text-sm">{item.guestName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.guestName}</p>
                      <p className="text-xs text-gray-400">Room {typeof item.room === 'string' ? item.room : item.room.name}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              ))}
              {todayCheckOuts.length === 0 && <p className="p-4 text-sm text-gray-500 text-center">No check-outs today</p>}
            </div>
          </div>
        </div>

        {/* Modal Overlay for New/View/Edit Booking */}
        {activeModal !== 'none' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

              {/* New Booking Modal */}
              {activeModal === 'newBooking' && (
                <>
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Create New Booking</h3>
                    <button onClick={() => setActiveModal('none')} className="p-2 hover:bg-gray-100 rounded-lg">
                      <CalendarX size={20} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name *</label>
                      <input
                        type="text"
                        value={newBookingForm.guestName}
                        onChange={(e) => setNewBookingForm({ ...newBookingForm, guestName: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        placeholder="Enter guest name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={newBookingForm.phone}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={newBookingForm.email}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          placeholder="guest@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room *</label>
                      <select
                        value={newBookingForm.room}
                        onChange={(e) => setNewBookingForm({ ...newBookingForm, room: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      >
                        <option value="">Select a room</option>
                        {availableRooms.map(room => (
                          <option key={room} value={room}>Room {room}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date *</label>
                        <input
                          type="date"
                          value={newBookingForm.checkIn}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, checkIn: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date *</label>
                        <input
                          type="date"
                          value={newBookingForm.checkOut}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, checkOut: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (RS)</label>
                      <input
                        type="number"
                        value={newBookingForm.amount}
                        onChange={(e) => setNewBookingForm({ ...newBookingForm, amount: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 p-5 border-t border-gray-100">
                    <button
                      onClick={() => setActiveModal('none')}
                      className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateBooking}
                      className="flex-1 py-2.5 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
                    >
                      Create Booking
                    </button>
                  </div>
                </>
              )}

              {/* View Booking Modal */}
              {activeModal === 'viewBooking' && selectedBooking && (
                <>
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
                    <button onClick={() => { setActiveModal('none'); setSelectedBooking(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                      <CalendarX size={20} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                      <div className="w-14 h-14 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {selectedBooking.guestName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{selectedBooking.guestName}</h4>
                        <p className="text-sm text-gray-500">{selectedBooking.id}</p>
                      </div>
                      <span className={`ml-auto text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Room</p>
                        <p className="font-semibold text-gray-900">{typeof selectedBooking.room === 'string' ? selectedBooking.room : selectedBooking.room.name}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Amount</p>
                        <p className="font-semibold text-gray-900">RS{selectedBooking.amount}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Check-in</p>
                        <p className="font-semibold text-gray-900">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Check-out</p>
                        <p className="font-semibold text-gray-900">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 p-5 border-t border-gray-100">
                    {selectedBooking.status === 'pending' && (
                      <button
                        onClick={() => { handleConfirmBooking(selectedBooking.id); setActiveModal('none'); setSelectedBooking(null); }}
                        className="flex-1 py-2.5 px-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                      >
                        Confirm Booking
                      </button>
                    )}
                    {selectedBooking.status !== 'cancelled' && (
                      <button
                        onClick={() => { handleCancelBooking(selectedBooking.id); setActiveModal('none'); setSelectedBooking(null); }}
                        className="flex-1 py-2.5 px-4 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50"
                      >
                        Cancel Booking
                      </button>
                    )}
                    <button
                      onClick={() => setActiveModal('editBooking')}
                      className="flex-1 py-2.5 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}

              {/* Edit Booking Modal */}
              {activeModal === 'editBooking' && selectedBooking && (
                <>
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Edit Booking</h3>
                    <button onClick={() => { setActiveModal('none'); setSelectedBooking(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                      <CalendarX size={20} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name</label>
                      <input
                        type="text"
                        value={selectedBooking.guestName}
                        onChange={(e) => setSelectedBooking({ ...selectedBooking, guestName: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                      <select
                        value={typeof selectedBooking.room === 'string' ? selectedBooking.roomId : selectedBooking.room.id}
                        onChange={(e) => setSelectedBooking({ ...selectedBooking, room: `Room ${e.target.value}`, roomId: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      >
                        {availableRooms.map(room => (
                          <option key={room} value={room}>Room {room}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                        <input
                          type="date"
                          value={selectedBooking.checkIn}
                          onChange={(e) => setSelectedBooking({ ...selectedBooking, checkIn: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                        <input
                          type="date"
                          value={selectedBooking.checkOut}
                          onChange={(e) => setSelectedBooking({ ...selectedBooking, checkOut: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (RS)</label>
                        <input
                          type="text"
                          value={selectedBooking.amount}
                          onChange={(e) => setSelectedBooking({ ...selectedBooking, amount: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={selectedBooking.status}
                          onChange={(e) => setSelectedBooking({ ...selectedBooking, status: e.target.value as Booking['status'] })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="checked-in">Checked In</option>
                          <option value="checked-out">Checked Out</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 p-5 border-t border-gray-100">
                    <button
                      onClick={() => { setActiveModal('none'); setSelectedBooking(null); }}
                      className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateBooking}
                      className="flex-1 py-2.5 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboardContent;

function StatusCard({ title, value, icon, color, isCurrency }: { title: string, value: number, icon: React.ReactNode, color: string, isCurrency?: boolean }) {
  const colors: Record<string, string> = {
    royal: 'bg-blue-50 text-blue-500',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-500',
    purple: 'bg-purple-50 text-purple-500',
  };

  return (
    <div className="bg-white rounded-[1vw] p-[1.5vw] shadow-sm border border-slate-100 hover:shadow-md transition-all group flex items-center justify-between gap-[1.2vw]">
      <div className={`p-[0.7vw] rounded-lg shrink-0 ${colors[color] || colors.royal} transition-all`}>
        {icon}
      </div>
      <div className="text-right">
        <p className="text-slate-400 text-[0.8vw]  uppercase tracking-wider mb-[0.2vh] ">{title}</p>
        <h3 className="text-[2vw] font-light text-slate-700 leading-none">
          {isCurrency ? `RS ${value.toLocaleString()}` : value}
        </h3>
      </div>
    </div>
  );
}