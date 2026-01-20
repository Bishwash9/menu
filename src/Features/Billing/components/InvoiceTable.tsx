import React, { useState } from 'react';
import { Search, Filter, Eye, Download, MoreVertical, Send, Trash2 } from 'lucide-react';
import type { Invoice, InvoiceStatus } from '../types';
import { INVOICE_STATUSES } from '../data';

interface InvoiceTableProps {
    invoices: Invoice[];
    onView?: (invoice: Invoice) => void;
    onDownload?: (invoice: Invoice) => void;
    onSendReminder?: (invoice: Invoice) => void;
    onDelete?: (invoiceId: string) => void;
    onMarkPaid?: (invoiceId: string) => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({
    invoices,
    onView,
    onDownload,
    onSendReminder,
    onDelete,
    onMarkPaid,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'All'>('All');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = 
            invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            invoice.guestName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: InvoiceStatus) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Overdue': return 'bg-red-100 text-red-700';
            case 'Cancelled': return 'bg-slate-100 text-slate-700';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-end">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by invoice number or guest..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 border border-slate-300 rounded-lg hover:bg-slate-50">
                        <Filter size={18} className="text-slate-500" />
                    </button>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20 bg-white"
                    >
                        <option value="All">All Status</option>
                        {INVOICE_STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Invoice</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Guest</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Date</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Due Date</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Amount</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Paid</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase text-xs">Status</th>
                                <th className="px-4 py-3 text-center font-semibold text-slate-600 uppercase text-xs">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <span className="font-semibold text-[#002366]">{invoice.invoiceNumber}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium text-slate-800">{invoice.guestName}</p>
                                            {invoice.roomNumber && (
                                                <p className="text-xs text-slate-500">Room {invoice.roomNumber}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{formatDate(invoice.date)}</td>
                                    <td className="px-4 py-3 text-slate-600">{formatDate(invoice.dueDate)}</td>
                                    <td className="px-4 py-3">
                                        <span className="font-semibold text-slate-800">RS{invoice.total.toLocaleString()}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`font-medium ${invoice.paidAmount >= invoice.total ? 'text-green-600' : 'text-[#D4AF37]'}`}>
                                            RS{invoice.paidAmount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => onView?.(invoice)}
                                                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye size={16} className="text-slate-500" />
                                            </button>
                                            <button
                                                onClick={() => onDownload?.(invoice)}
                                                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Download"
                                            >
                                                <Download size={16} className="text-slate-500" />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActiveMenu(activeMenu === invoice.id ? null : invoice.id)}
                                                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    <MoreVertical size={16} className="text-slate-500" />
                                                </button>
                                                {activeMenu === invoice.id && (
                                                    <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[140px] z-10">
                                                        {invoice.status !== 'Paid' && (
                                                            <button
                                                                onClick={() => { onMarkPaid?.(invoice.id); setActiveMenu(null); }}
                                                                className="w-full px-3 py-2 text-left text-sm text-green-600 hover:bg-green-50"
                                                            >
                                                                Mark as Paid
                                                            </button>
                                                        )}
                                                        {(invoice.status === 'Pending' || invoice.status === 'Overdue') && (
                                                            <button
                                                                onClick={() => { onSendReminder?.(invoice); setActiveMenu(null); }}
                                                                className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                                            >
                                                                <Send size={14} /> Send Reminder
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => { 
                                                                if (confirm('Delete this invoice?')) onDelete?.(invoice.id); 
                                                                setActiveMenu(null); 
                                                            }}
                                                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredInvoices.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p className="text-lg">No invoices found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};
