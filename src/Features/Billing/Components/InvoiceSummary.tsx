import React from 'react';

interface InvoiceSummaryProps {
    subtotal: number;
    tax: number;
    total: number;
    compact?: boolean;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
    subtotal,
    tax,
    total,
    compact = false,
}) => {
    if (compact) {
        return (
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>RS{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>Tax (18%):</span>
                    <span>RS{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-[#002366] border-t border-slate-200 pt-1.5 mt-1.5">
                    <span>Total:</span>
                    <span className="text-lg">RS{total.toFixed(2)}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Invoice Summary</h3>
            <div className="space-y-2.5">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="text-slate-800 font-medium">RS{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Tax (18%):</span>
                    <span className="text-slate-800 font-medium">RS{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-white rounded-lg px-3 mt-3">
                    <span className="text-lg font-semibold text-[#002366]">Total:</span>
                    <span className="text-2xl font-bold text-[#002366]">RS{total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
