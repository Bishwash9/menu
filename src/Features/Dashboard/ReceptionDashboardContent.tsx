import { useState, useEffect } from 'react';
import Banner from '@assets/Banner.svg';
import {
    BedDouble,
    CalendarCheck,
    CalendarX,
    Clock,
    Brush,
    UserPlus,
    LogOut,
    CheckCircle2,
    AlertCircle,
    ChevronRight
} from 'lucide-react';
import { initialRooms } from '../Rooms/data';

// Mock bookings for front-desk only view
const mockBookings = [
    { id: 'BK001', guestName: 'Alice Thompson', room: '101', type: 'Single', checkIn: 'Today', status: 'Confirmed' },
    { id: 'BK002', guestName: 'Bob Harrison', room: '202', type: 'Deluxe', checkIn: 'Today', status: 'Arrived' },
    { id: 'BK003', guestName: 'Charlie Davis', room: '301', type: 'Suite', checkOut: 'Today', status: 'Stayed' },
];

function StaffDashboardContent() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [rooms] = useState(initialRooms);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const roomStats = {
        available: rooms.filter(r => r.status === 'Available').length,
        occupied: rooms.filter(r => r.status === 'Occupied').length,
        cleaning: rooms.filter(r => r.status === 'Cleaning').length,
        maintenance: rooms.filter(r => r.status === 'Maintenance').length,
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

    return (
        <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col bg-dashboard-bg overflow-hidden font-light">
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
                        <span className="text-dashboard-primary text-[0.8vw] font-light uppercase tracking-widest">
                            Reception Desk
                        </span>
                        <div className="h-px w-[5vw] bg-dashboard-primary/10" />
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-[3vw] font-light text-dashboard-primary leading-none tracking-tight mb-[1vh]">
                                Welcome back, <span className="font-normal">Staff</span>
                            </h2>

                        </div>

                        <div className="text-right pb-[1vh]">
                            <div className="text-[3.5vw] font-light text-dashboard-primary leading-none mb-[0.5vh] tabular-nums">
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
            <div className="flex-1 flex overflow-hidden p-[2.5vw] gap-[2.5vw] bg-slate-50/30">
                {/* Main Interaction Area (Left) */}
                <div className="flex-1 flex flex-col gap-[3vh] overflow-hidden">
                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-[2vw]">
                        <StatusCard
                            title="Available"
                            value={roomStats.available}
                            icon={<BedDouble className="w-[1.4vw] h-[1.4vw]" />}
                            color="green"
                        />
                        <StatusCard
                            title="Arrivals"
                            value={4}
                            icon={<CalendarCheck className="w-[1.4vw] h-[1.4vw]" />}
                            color="royal"
                        />
                        <StatusCard
                            title="Departing"
                            value={3}
                            icon={<CalendarX className="w-[1.4vw] h-[1.4vw]" />}
                            color="orange"
                        />
                        <StatusCard
                            title="Turnover"
                            value={roomStats.cleaning}
                            icon={<Brush className="w-[1.4vw] h-[1.4vw]" />}
                            color="purple"
                        />
                    </div>

                    {/* Guest Arrivals List */}
                    <div className="flex-1 bg-white rounded-[1vw] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                        <div className="px-[2vw] py-[2.5vh] border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-[1.1vw] font-normal text-slate-700 flex items-center gap-[0.8vw]">
                                <Clock className="text-slate-400 w-[1.2vw] h-[1.2vw]" />
                                Today's Arrivals
                            </h3>
                            <button className="text-[0.7vw] font-normal text-slate-400 hover:text-dashboard-primary transition-colors uppercase tracking-widest">
                                Full Manifest
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-[2vw] py-[2vh] space-y-[1vh]">
                            {mockBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between p-[1.2vw] rounded-[0.8vw] border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-[1.5vw]">
                                        <div className="w-[3vw] h-[3vw] rounded-full bg-slate-100 text-dashboard-primary flex items-center justify-center font-light text-[1.1vw]">
                                            {booking.guestName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[1vw] font-normal text-slate-800 leading-tight">{booking.guestName}</p>
                                            <p className="text-[0.8vw] text-slate-400 font-light mt-[0.2vh]">
                                                Room {booking.room} • {booking.type}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-[2vw]">
                                        <div className="text-right">
                                            <span className={`text-[0.6vw] font-normal px-[0.7vw] py-[0.3vh] rounded-full uppercase
                                                ${booking.status === 'Arrived' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {booking.status}
                                            </span>
                                            <p className="text-[0.6vw] text-slate-300 font-light mt-[0.3vh]">#{booking.id}</p>
                                        </div>
                                        <ChevronRight className="w-[1.1vw] h-[1.1vw] text-slate-200 group-hover:text-slate-400 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-[20vw] flex flex-col gap-[3vh]">
                    {/* Action Hub */}
                    <div className="bg-white rounded-[1vw] p-[1.5vw] shadow-sm border border-slate-100 flex flex-col gap-[2vh]">
                        <h3 className="text-[0.9vw] font-normal text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-[1vh]">
                            Quick Actions
                        </h3>
                        <div className="space-y-[1vh]">
                            <ActionButton icon={<UserPlus size={16} />} label="New Booking" primary />
                            <ActionButton icon={<CheckCircle2 size={16} />} label="Instant Check-in" />
                            <ActionButton icon={<LogOut size={16} />} label="Instant Check-out" />
                        </div>
                    </div>

                    {/* Room Stats */}
                    <div className="flex-1 bg-white rounded-[1vw] p-[1.5vw] shadow-sm border border-slate-100 flex flex-col">
                        <h3 className="text-[0.9vw] font-normal text-slate-400 uppercase tracking-widest mb-[2vh]">Inventory</h3>
                        <div className="flex-1 flex flex-col gap-[1vh] justify-center">
                            <SmallInventoryItem label="Total Rooms" value={rooms.length} color="slate" />
                            <SmallInventoryItem label="Occupied" value={roomStats.occupied} color="royal" />
                            <SmallInventoryItem label="Cleaning" value={roomStats.cleaning} color="purple" />
                            <SmallInventoryItem label="Maintenance" value={roomStats.maintenance} color="orange" />
                        </div>
                    </div>

                    {/* Simple Alerts */}
                    <div className="bg-white rounded-[1vw] p-[1.5vw] shadow-sm border border-slate-100">
                        <h3 className="text-[0.7vw] font-normal text-slate-300 uppercase tracking-widest mb-[1.5vh]">Alerts</h3>
                        <div className="space-y-[1.5vh]">
                            <AlertItem
                                icon={<AlertCircle className="text-orange-300 w-[1vw] h-[1vw]" />}
                                msg="Maintenance overdue: 301"
                                time="Active"
                            />
                            <AlertItem
                                icon={<Clock className="text-blue-300 w-[1vw] h-[1vw]" />}
                                msg="4 guests due for check-out"
                                time="Pending"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
    const colors: Record<string, string> = {
        royal: 'bg-blue-50 text-blue-500',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-500',
        purple: 'bg-purple-50 text-purple-500',
    };

    return (
        <div className="bg-white rounded-[1vw] p-[1.5vw] shadow-sm border border-slate-100 hover:shadow-md transition-all group flex justify-between items-center gap-[1.2vw]">
            {/* ICON ON THE LEFT */}
            <div className={`p-[0.8vw] rounded-xl shrink-0 ${colors[color] || colors.royal} transition-all`}>
                {icon}
            </div>
            {/* TEXT ON THE RIGHT */}
            <div className="flex flex-col">
                <p className="text-slate-400 text-[0.8vw] font-light uppercase tracking-wider mb-[0.2vh]">
                    {title}
                </p>
                <h3 className="text-[2vw] font-light text-slate-700 leading-none">
                    {value}
                </h3>
            </div>
        </div>
    );
}

function SmallInventoryItem({ label, value, color }: { label: string, value: number, color: string }) {
    const colors: Record<string, string> = {
        slate: 'bg-slate-50 text-slate-600',
        royal: 'bg-blue-50/30 text-blue-600',
        purple: 'bg-purple-50/30 text-purple-600',
        orange: 'bg-orange-50/30 text-orange-700',
    };
    return (
        <div className={`flex items-center justify-between p-[0.8vw] rounded-[0.6vw] ${colors[color] || colors.slate}`}>
            <span className="text-[0.7vw] font-light uppercase tracking-wider">{label}</span>
            <span className="text-[1.1vw] font-normal">{value}</span>
        </div>
    );
}

function ActionButton({ icon, label, primary }: { icon: React.ReactNode, label: string, primary?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-[0.8vw] px-[1vw] py-[1.2vh] rounded-[0.8vw] text-[0.8vw] font-light transition-all
            ${primary ? 'bg-dashboard-primary text-white shadow-sm hover:shadow-md' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'}`}>
            {icon ? <div className="w-[1.2vw] h-[1.2vw] text-dashboard-accent flex items-center justify-center">{icon}</div> : null}
            <span className="uppercase tracking-widest">{label}</span>
        </button>
    );
}

function AlertItem({ icon, msg, time }: { icon: React.ReactNode, msg: string, time: string }) {
    return (
        <div className="flex gap-[0.8vw] items-center">
            {icon}
            <div className="flex-1">
                <p className="text-[0.75vw] font-light text-slate-500 leading-tight">{msg}</p>
                <p className="text-[0.6vw] font-light text-slate-300 mt-[0.1vh] uppercase">{time}</p>
            </div>
        </div>
    );
}

export default StaffDashboardContent;