import React, { useEffect, useState } from 'react'
import { MOCK_ORDER_DATA } from '../Lib/orderdata'
import type { OrderModel, OrderType } from '../Types/order'
import { useNavigate } from 'react-router-dom';

import { roomService } from '../Services/roomService';
import type { Room } from '../Types/room';
import type { Table } from '../Types/table';
import { tableService } from '../Services/tableService';

interface OrderModelPageProps {
    isModal?: boolean;
    onNext?: (data: { orderType: OrderType; identifier: any}) => void;
}


const OrderModelPage: React.FC<OrderModelPageProps> = ({ isModal = false, onNext }) => {



    const navigate = useNavigate();

    const [formData, setFormData] = useState<OrderModel>({
        fullname: '',
        orderType: 'table',
        identifier: MOCK_ORDER_DATA.table
    });



    const [rooms, setRooms] = useState<Room[]> ([]);
    const [tables, setTables] = useState<Table[]> ([]);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [loadingTables, setLoadingTables] = useState(true);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
    const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

    useEffect (() => {
        const fetchData = async ()  => {

            try{
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                const businessId = userData.business_id;

                if(businessId){

                    //fetching room
                    setLoadingRooms(true);
                    const roomData = await roomService.getRooms(businessId);
                    setRooms(roomData);
                    setLoadingRooms(false);

                    //fetching tables
                    setLoadingTables(true);
                    const tableData = await tableService.getTables(businessId);
                    setTables(tableData);
                    setLoadingTables(false);
                }
            }catch(error){
                console.error("Failed to fetch room and tables:", error);
            }
        };
        fetchData();
    }, []);


    const handleTypeChange = (newType: OrderType) => {
        setFormData((prev) => ({
            ...prev,
            orderType: newType,
            identifier: ''
        }))
        setSelectedRoomId(null);
        setSelectedTableId(null);
    }

    const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const roomId  = parseInt(e.target.value);
        const selectedRoom = rooms.find(r => r.id === roomId);
        if(selectedRoom){
            setSelectedRoomId(roomId);
            setFormData((prev)=> ({
                ...prev,
                identifier: selectedRoom.room_number
            }));
        }
    }

    const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tableId = parseInt(e.target.value);
        const selectedTable = tables.find(t => t.id === tableId);
        if(selectedTable){
            setSelectedTableId(tableId);
            setFormData((prev)=> ({
                ...prev,
                identifier: selectedTable.table_number
            }));
        }
    }

   const handleNext = () =>{
        if(onNext){
            onNext({orderType: formData.orderType, identifier: formData.identifier});
        }else {
            navigate(`/menu?type=${formData.orderType}&id=${formData.identifier}`);
        }
   }


    




        const content = (
        <>
            <h2 className="text-2xl font-bold mb-8 text-[#002366] text-center tracking-tight">
                Create Order
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#002366] ml-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        placeholder='Your name'
                        className='w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 transition-all focus:outline-none focus:border-[#002366] focus:bg-white'
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
                        disabled={loadingRooms}
                        className='w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 transition-all focus:outline-none focus:border-[#002366] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        <option value="">
                            {loadingRooms ? 'Loading rooms...' : 'Select a room'}
                        </option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                                Room {room.room_number} - {room.room_type_name} ({room.status_name})
                            </option>
                        ))}
                    </select>
                ) : (
                    <select
                        value={selectedTableId || ''}
                        onChange={handleTableChange}
                        disabled={loadingTables}
                        className='w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 transition-all focus:outline-none focus:border-[#002366] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        <option value="">
                            {loadingTables ? 'Loading tables...' : 'Select a table'}
                        </option>
                        {tables.map(table => (
                            <option key={table.id} value={table.id}>
                                Table {table.table_number} - {table.location} ({table.status_name})
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <button
                onClick={handleNext}
                disabled={!formData.identifier}
                className='w-full bg-[#002366] hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group shadow-lg shadow-[#002366]/20'
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

    if (isModal) {
        return content;
    }

    return (
        <div className="flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-8 w-full max-w-105 shadow-[0_20px_50px_rgba(0,35,102,0.1)] border border-gray-100">
                {content}
            </div>
        </div>
    );
}

export default OrderModelPage