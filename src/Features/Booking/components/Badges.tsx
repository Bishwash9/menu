import React from 'react';
import type { BookingStatus, PaymentStatus } from '../types';

export const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
    const styles = {
        confirmed: 'bg-[#1E3A8A] text-white',
        pending: 'bg-[#D4AF37] text-white',
        'checked-in': 'bg-[#1E3A8A] text-white opacity-90',
        'checked-out': 'bg-gray-500 text-white',
        cancelled: 'bg-red-500 text-white',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize shadow-sm ${styles[status]}`}>
            {status.replace('-', ' ')}
        </span>
    );
};

export const PaymentBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
    const styles = {
        paid: 'bg-green-100 text-green-700 border border-green-200',
        pending: 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20',
        refunded: 'bg-gray-100 text-gray-700 border border-gray-200',
    };

    return (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${styles[status]}`}>
            {status}
        </span>
    );
};
