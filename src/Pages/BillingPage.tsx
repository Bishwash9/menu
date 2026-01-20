import React, { useState } from 'react';
import { Plus, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { SideBar } from '../components/layout/Sidebar';
import { InvoiceTable, InvoiceModal, initialInvoices } from '../Features/Billing';
import type { Invoice, BillingStats } from '../Features/Billing/types';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconBgColor: string;
    valueColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor, valueColor = 'text-slate-800' }) => (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 font-medium">{title}</p>
                <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</p>
            </div>
            <div className={`p-3 rounded-xl ${iconBgColor}`}>
                {icon}
            </div>
        </div>
    </div>
);

const BillingPage: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');

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
                                    <span>RS${item.amount.toFixed(2)}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="line"></div>
                        <div class="total">Total: RS${invoice.total.toFixed(2)}</div>
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
        <div className="flex h-screen bg-[#F8FAFC]">
            <SideBar role="admin" />
            
            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200"></div>
                
                <div className="p-6">
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
                            value={`RS${stats.totalRevenue.toLocaleString()}`}
                            icon={<DollarSign size={24} className="text-green-600" />}
                            iconBgColor="bg-green-100"
                            valueColor="text-green-600"
                        />
                        <StatCard
                            title="Pending Payments"
                            value={`RS${stats.pendingPayments.toLocaleString()}`}
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
                            value={`RS${stats.overdueAmount.toLocaleString()}`}
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
            </main>
        </div>
    );
};

export default BillingPage;
