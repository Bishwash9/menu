import React, { useEffect, useState } from 'react';
import QuickMenuPopup from '../Components/Layout/QuickMenuPopup';
import type { Table } from '../Types/table';
import type { Room } from '../Types/room';
import { tableService } from '../Services/tableService';
import { roomService } from '../Services/roomService';
import { useAuth } from '../Context/AuthContext';
import { X } from 'lucide-react';

interface FormData {
    fullname: string;
    identifier: string;
    orderType: 'table' | 'room';
    notes: string;
}

interface OrderModelPageProps {
    isModal?: boolean;
    onClose?: () => void;
    onNext?: (data: FormData) => void;
}

const OrderModelPage: React.FC<OrderModelPageProps> = ({ isModal = false, onClose, onNext }) => {
    const { user } = useAuth();

    const [tables, setTables] = useState<Table[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoadingTables, setIsLoadingTables] = useState(false);
    const [isLoadingRooms, setIsLoadingRooms] = useState(false);

    const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState<FormData>({
        fullname: '',
        identifier: '',
        orderType: 'table',
        notes: '',
    });

    useEffect(() => {
        if (user?.business_id) {
            fetchTables();
        }
    }, [user?.business_id]);

    useEffect(() => {
        if (formData.orderType === 'room' && user?.business_id) {
            fetchRooms();
        }
    }, [formData.orderType, user?.business_id]);

    const fetchTables = async () => {
        if (!user?.business_id) return;

        setIsLoadingTables(true);
        try {
            const response = await tableService.getTables(user.business_id);
            const availableTables = response.filter((table: Table) =>
                table.status_name?.toLowerCase() === 'available' ||
                table.status_name?.toLowerCase() === 'reserved'
            );
            setTables(availableTables);
        } catch (error) {
            console.error('Failed to fetch tables:', error);
        } finally {
            setIsLoadingTables(false);
        }
    };

    const fetchRooms = async () => {
        if (!user?.business_id) return;

        setIsLoadingRooms(true);
        try {
            const response = await roomService.getRooms(user.business_id);
            const availableRooms = response.filter((room: Room) =>
                room.status_name?.toLowerCase() === 'available' ||
                room.status_name?.toLowerCase() === 'occupied'
            );
            setRooms(availableRooms);
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        } finally {
            setIsLoadingRooms(false);
        }
    };

    const handleTypeChange = (type: 'table' | 'room') => {
        setFormData({ ...formData, orderType: type, identifier: '' });
        setSelectedTableId(null);
        setSelectedRoomId(null);
        setErrorMessage('');
    };

    const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === '') {
            setSelectedTableId(null);
            setFormData({ ...formData, identifier: '' });
            return;
        }

        const tableId = parseInt(value, 10);
        if (Number.isNaN(tableId) || tableId <= 0) {
            setErrorMessage('Please select a valid table number');
            setSelectedTableId(null);
            return;
        }

        const selectedTable = tables.find((table) => table.id === tableId);
        const identifier = selectedTable ? `${selectedTable.table_number}` : `${tableId}`;

        setSelectedTableId(tableId);
        setFormData({ ...formData, identifier });
        setErrorMessage('');
    };

    const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === '') {
            setSelectedRoomId(null);
            setFormData({ ...formData, identifier: '' });
            return;
        }

        const roomId = parseInt(value, 10);
        if (Number.isNaN(roomId) || roomId <= 0) {
            setErrorMessage('Please select a valid room number');
            setSelectedRoomId(null);
            return;
        }

        const selectedRoom = rooms.find((room) => room.id === roomId);
        const identifier = selectedRoom ? `${selectedRoom.room_number}` : `${roomId}`;

        setSelectedRoomId(roomId);
        setFormData({ ...formData, identifier });
        setErrorMessage('');
    };

    const handleNext = () => {
        if (!formData.identifier) {
            setErrorMessage('Please select a location');
            return;
        }

        if (onNext) {
            onNext(formData);
            return;
        }

        setIsModalOpen(true);
    };

    const content = (
        <>
            <div className="flex items-start justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#002366] text-center tracking-tight w-full">
                    Create Order
                </h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="-mr-2 -mt-1 p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#002366] ml-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        placeholder="Your name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 transition-all focus:outline-none focus:border-[#002366] focus:bg-white"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#002366] ml-1">
                        Select Type
                    </label>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-1 flex gap-1 h-11.5">
                        <div
                            className={`flex-1 flex items-center justify-center cursor-pointer rounded-lg text-xs font-bold transition-all ${formData.orderType === 'table'
                                ? 'bg-white text-[#002366] shadow-sm ring-1 ring-gray-100'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                            onClick={() => handleTypeChange('table')}
                        >
                            Table
                        </div>
                        <div
                            className={`flex-1 flex items-center justify-center cursor-pointer rounded-lg text-xs font-bold transition-all ${formData.orderType === 'room'
                                ? 'bg-white text-[#002366] shadow-sm ring-1 ring-gray-100'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                            onClick={() => handleTypeChange('room')}
                        >
                            Room
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-8">
                <label className="text-[13px] font-semibold text-[#002366] ml-1">
                    {formData.orderType === 'table' ? 'Table Number' : 'Room Number'}
                </label>

                {formData.orderType === 'room' ? (
                    <select
                        value={selectedRoomId || ''}
                        onChange={handleRoomChange}
                        disabled={isLoadingRooms}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 transition-all focus:outline-none focus:border-[#002366] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">
                            {isLoadingRooms ? 'Loading rooms...' : 'Select a room'}
                        </option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                Room {room.room_number} - {room.room_type_name} ({room.status_name})
                            </option>
                        ))}
                    </select>
                ) : (
                    <select
                        value={selectedTableId || ''}
                        onChange={handleTableChange}
                        disabled={isLoadingTables}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 transition-all focus:outline-none focus:border-[#002366] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">
                            {isLoadingTables ? 'Loading tables...' : 'Select a table'}
                        </option>
                        {tables.map((table) => (
                            <option key={table.id} value={table.id}>
                                Table {table.table_number} - {table.location} ({table.status_name})
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {errorMessage}
                </div>
            )}

            <div className="flex flex-col gap-1.5 mb-6">
                <label className="text-[13px] font-semibold text-[#002366] ml-1">
                Order Notes (Optional)
                </label>
                 <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions or requests..."
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 transition-all focus:outline-none focus:border-[#002366] focus:bg-white resize-none"
                />
            </div>

            <button
                onClick={handleNext}
                disabled={!formData.identifier}
                className="w-full bg-[#002366] hover:bg-[#001a47] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group shadow-lg shadow-[#002366]/20"
            >
                <span>Next</span>
                <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </>
    );

    if (isModalOpen) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <QuickMenuPopup
                    orderData={{
                        orderType: formData.orderType,
                        identifier: formData.identifier,
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        );
    }

    if (isModal) {
        return (
            <div className="w-full bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,35,102,0.1)]">
                {content}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-6 min-h-screen">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[0_20px_50px_rgba(0,35,102,0.1)] border border-gray-100">
                {content}
            </div>
        </div>
    );
};

export default OrderModelPage;
