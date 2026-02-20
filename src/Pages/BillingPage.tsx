import React, { useState } from 'react';
import { Plus, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { InvoiceTable, InvoiceModal, initialInvoices } from '../Features/Billing';
import type { Invoice, BillingStats } from '../Features/Billing/Types';


interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconBgColor: string;
    valueColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor, valueColor = 'text-slate-800' }) => (
    <div className="bg-white rounded-[1vw] p-[1.5vw] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex items-center justify-between gap-[1.2vw]">
        <div className={`p-[0.7vw] rounded-lg shrink-0 ${iconBgColor} transition-all`}>
            {icon}
        </div>
        <div className="text-right flex-1 min-w-0">
            <p className="text-[0.8vw] text-slate-400 uppercase tracking-wider mb-[0.2vh] truncate">{title}</p>
            <p className={`text-[2vw] font-bold leading-none ${valueColor}`}>{value}</p>
        </div>
    </div>
);

const BillingPage: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [invoiceStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');

    // Calculate stats
    const stats: BillingStats = {
        totalRevenue: invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.total, 0),
        pendingPayments: invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + (i.total - i.paidAmount), 0),
        paidInvoices: invoices.filter(i => i.status === 'Paid').length,
        overdueAmount: invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.total, 0),
    };

    const handleViewInvoice = (invoice: Invoice) => {
        // TODO: Implement view modal
        console.log('View invoice', invoice);
    };

    const handleDownloadInvoice = (invoice: Invoice) => {
        // Trigger browser print dialog
        const printWindow = window.open('', '', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Invoice ${invoice.invoiceNumber}</title>
                    <style>
                        * { margin: 0; padding: 0; }
                        body { font-family: 'Courier New', monospace; }
                        .container { width: 80mm; margin: 0 auto; padding: 10px; }
                        .header { text-align: center; margin-bottom: 15px; }
                        .hotel-name { font-size: 18px; font-weight: bold; }
                        .invoice-title { font-size: 14px; font-weight: bold; margin-top: 10px; }
                        .info { font-size: 12px; margin: 10px 0; }
                        .line { border-bottom: 1px dashed #000; margin: 8px 0; }
                        .items { font-size: 12px; width: 100%; margin: 10px 0; }
                        .item-row { display: flex; justify-content: space-between; margin: 5px 0; }
                        .total { font-weight: bold; font-size: 14px; text-align: right; margin-top: 10px; }
                        .footer { text-align: center; font-size: 11px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="hotel-name">🏨 HOTEL MANAGEMENT</div>
                            <div class="invoice-title">INVOICE</div>
                        </div>
                        <div class="line"></div>
                        <div class="info">
                            <div>Invoice: ${invoice.invoiceNumber}</div>
                            <div>Date: ${invoice.date}</div>
                            <div>Guest: ${invoice.guestName}</div>
                        </div>
                        <div class="line"></div>
                        <div class="items">
                            ${invoice.items.map(item => `
                                <div class="item-row">
                                    <span>${item.description} x${item.quantity}</span>
                                    <span>Rs. {item.amount.toFixed(2)}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="line"></div>
                        <div class="total">Total: Rs. {invoice.total.toFixed(2)}</div>
                        <div class="info" style="margin-top: 15px;">
                            <div>Status: ${invoice.status}</div>
                            <div>Payment: ${invoice.paymentMethod || 'N/A'}</div>
                        </div>
                        <div class="footer">
                            <div>Thank you for your visit!</div>
                            <div>Generated: ${new Date().toLocaleString()}</div>
                        </div>
                    </div>
                    <script>
                        window.print();
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const handleSendReminder = (invoice: Invoice) => {
        alert(`Reminder sent for invoice ${invoice.invoiceNumber}`);
    };

    const handleDeleteInvoice = (invoiceId: string) => {
        setInvoices(invoices.filter(i => i.id !== invoiceId));
    };

    const handleMarkPaid = (invoiceId: string) => {
        setInvoices(invoices.map(i =>
            i.id === invoiceId
                ? { ...i, status: 'Paid' as const, paidAmount: i.total, paymentMethod: 'Cash' as const }
                : i
        ));
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#002366]">Billing & Invoices</h1>
                    <p className="text-slate-500">Manage invoices and track payments</p>
                </div>
                <button
                    onClick={() => setIsInvoiceModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#b8962e] transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Create Invoice
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    title="Total Revenue"
                    value={`Rs. ${stats.totalRevenue.toLocaleString()}`}
                    icon={<DollarSign size={24} className="text-green-600" />}
                    iconBgColor="bg-green-100"
                    valueColor="text-green-600"
                />
                <StatCard
                    title="Pending Payments"
                    value={`Rs. ${stats.pendingPayments.toLocaleString()}`}
                    icon={<Clock size={24} className="text-yellow-600" />}
                    iconBgColor="bg-yellow-100"
                    valueColor="text-yellow-600"
                />
                <StatCard
                    title="Paid Invoices"
                    value={String(stats.paidInvoices)}
                    icon={<CheckCircle size={24} className="text-[#002366]" />}
                    iconBgColor="bg-[#002366]/10"
                />
                <StatCard
                    title="Overdue Amount"
                    value={`Rs. ${stats.overdueAmount.toLocaleString()}`}
                    icon={<AlertTriangle size={24} className="text-red-500" />}
                    iconBgColor="bg-red-100"
                    valueColor="text-red-500"
                />
            </div>

            {/* Invoice Table */}
            <InvoiceTable
                invoices={invoiceStatusFilter === 'All' ? invoices : invoices.filter(i => i.status === invoiceStatusFilter)}
                onView={handleViewInvoice}
                onDownload={handleDownloadInvoice}
                onSendReminder={handleSendReminder}
                onDelete={handleDeleteInvoice}
                onMarkPaid={handleMarkPaid}
            />

            {/* Create Invoice Modal */}
            <InvoiceModal
                isOpen={isInvoiceModalOpen}
                onClose={() => setIsInvoiceModalOpen(false)}
                onSave={(invoice) => {
                    setInvoices([invoice, ...invoices]);
                    setIsInvoiceModalOpen(false);
                    alert('Invoice created successfully!');
                }}
            />
        </div>
    );

};

export default BillingPage;
