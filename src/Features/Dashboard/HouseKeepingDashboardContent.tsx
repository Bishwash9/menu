import { useState } from 'react';
import { Search, CheckCircle, Clock } from 'lucide-react';

interface Room {
  id: number;
  roomNo: string;
  status: 'pending' | 'completed';
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBgColor: string;
  valueColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor }) => (
  <div className="bg-white rounded-[1vw] p-[1.5vw] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex items-center justify-between gap-[1.2vw]">
    <div className={`p-[0.7vw] rounded-lg shrink-0 ${iconBgColor} transition-all`}>
      {icon}
    </div>
    <div className="text-right flex-1 min-w-0">
      <p className="text-[0.8vw] text-slate-400 uppercase tracking-wider mb-[0.2vh] truncate">{title}</p>
      <p className="text-[2vw] font-light text-slate-700 leading-none">{value}</p>
    </div>
  </div>
);

const HouseKeepingDashboardContent = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, roomNo: '101', status: 'completed' },
    { id: 2, roomNo: '102', status: 'pending' },
    { id: 3, roomNo: '103', status: 'pending' },
    { id: 4, roomNo: '104', status: 'completed' },
    { id: 5, roomNo: '105', status: 'pending' },
    { id: 6, roomNo: '106', status: 'completed' },
    { id: 7, roomNo: '107', status: 'pending' },
    { id: 8, roomNo: '108', status: 'pending' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRoomStatus = (id: number): void => {
    setRooms(rooms.map(room =>
      room.id === id
        ? { ...room, status: room.status === 'pending' ? 'completed' : 'pending' }
        : room
    ));
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedRooms: number = rooms.filter(room => room.status === 'completed').length;
  const pendingRooms: number = rooms.filter(room => room.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2vw]">
          <StatCard
            title="Rooms Completed"
            value={completedRooms}
            icon={<CheckCircle className="w-[1.4vw] h-[1.4vw] text-emerald-600" />}
            iconBgColor="bg-emerald-100"
            valueColor="text-emerald-600"
          />

          <StatCard
            title="Rooms Pending"
            value={pendingRooms}
            icon={<Clock className="w-[1.4vw] h-[1.4vw] text-orange-600" />}
            iconBgColor="bg-orange-100"
            valueColor="text-orange-600"
          />
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Room No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-status-confirmed/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">ROOM NO</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">STATUS</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRooms.map((room: Room) => (
                  <tr key={room.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-800">
                      {room.roomNo}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${room.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-orange-100 text-orange-700'
                        }`}>
                        {room.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div
                        onClick={() => room.status !== 'completed' && toggleRoomStatus(room.id)}
                        className={`relative w-14 h-7 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${room.status === 'completed' ? 'bg-emerald-500 cursor-not-allowed opacity-60' : 'bg-slate-600'
                          }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${room.status === 'completed' ? 'translate-x-7' : 'translate-x-0'
                            }`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRooms.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No rooms found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseKeepingDashboardContent;