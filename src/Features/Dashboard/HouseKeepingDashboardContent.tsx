import { useState } from 'react';

interface Room {
  id: number;
  roomNo: string;
  status: 'pending' | 'completed';
}

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

  const toggleRoomStatus = (id: number): void => {
    setRooms(rooms.map(room => 
      room.id === id 
        ? { ...room, status: room.status === 'pending' ? 'completed' : 'pending' } 
        : room
    ));
  };

  const completedRooms: number = rooms.filter(room => room.status === 'completed').length;
  const pendingRooms: number = rooms.filter(room => room.status === 'pending').length;

  const getTransformClass = (status: 'pending' | 'completed'): string => {
    return status === 'completed' ? 'translate-x-[88px]' : 'translate-x-0';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Rooms Completed</h3>
            <p className="text-4xl font-bold text-emerald-600">{completedRooms}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Rooms Pending</h3>
            <p className="text-4xl font-bold text-orange-600">{pendingRooms}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room: Room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {room.roomNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      room.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {room.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      onClick={() => toggleRoomStatus(room.id)}
                      className={`relative w-44 h-16 border-4 border-gray-300 rounded-full flex items-center p-1.5 cursor-pointer active:scale-95 shadow-lg overflow-hidden transition-colors duration-300 ${
                        room.status === 'completed' ? 'bg-emerald-500' : 'bg-[#434e5b]'
                      }`}
                    >
                      <div 
                        className={`w-12 h-12 bg-white rounded-full shadow-2xl transition-transform duration-150 ease-out transform ${getTransformClass(room.status)}`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HouseKeepingDashboardContent;