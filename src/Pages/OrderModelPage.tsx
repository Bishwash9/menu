import React, { useEffect, useState } from 'react'
import { MOCK_ORDER_DATA } from '../Lib/orderdata'
import type { OrderModel, OrderType } from '../Types/order'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface OrderModelPageProps {
    isModal?: boolean;
}


const OrderModelPage: React.FC<OrderModelPageProps> = ({ isModal = false }) => {

    const location = useLocation();

    useEffect(() => {
        const typeFromSidebar = location.state?.orderType as OrderType | undefined;

        if (typeFromSidebar) {
            handleTypeChange(typeFromSidebar)
        }
    }, [location.state]);


    const [formData, setFormData] = useState<OrderModel>({
        fullname: '',
        orderType: 'table',
        identifier: MOCK_ORDER_DATA.table
    });

    const handleTypeChange = (newType: OrderType) => {
        setFormData((prev) => ({
            ...prev,
            orderType: newType,
            identifier: MOCK_ORDER_DATA[newType]
        }));
    };

    const handleNext = () => {
        console.log("Order Submitted");
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
                <input
                    type="text"
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    className='w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 transition-all focus:outline-none focus:border-[#002366] focus:bg-white'
                    placeholder={`e.g. ${formData.orderType === 'table' ? 'T10' : '402'}`}
                />
            </div>

            <Link to='/menu'>
                <button
                    onClick={handleNext}
                    disabled={!formData.identifier}
                    className='w-full bg-[#002366] hover:bg-[#001a4d] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group shadow-lg shadow-[#002366]/20'
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
            </Link>
        </>
    );

    if (isModal) {
        return content;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-8 w-full max-w-105 shadow-[0_20px_50px_rgba(0,35,102,0.1)] border border-gray-100">
                {content}
            </div>
        </div>
    );
}

export default OrderModelPage