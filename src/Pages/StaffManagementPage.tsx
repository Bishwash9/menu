import { useState } from 'react';
import { SideBar } from '../Components/Layout/Sidebar';
import { Download, Plus } from 'lucide-react';
import {
    StaffStatCard,
    StaffModal,
    StaffContent,
    MOCK_EMPLOYEES,
    type Employee,
} from '../Features/StaffManagement';

function StaffManagementPage() {
    const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const stats = {
        totalStaff: employees.length,
        active: employees.filter(e => e.status === 'Active').length,
        onLeave: employees.filter(e => e.status === 'On Leave').length,
        totalRoles: new Set(employees.map(e => e.role)).size,
    };

    const handleAddEmployee = (employee: Employee) => {
        if (editingEmployee) {
            setEmployees(employees.map(e => e.id === employee.id ? employee : e));
            setEditingEmployee(null);
        } else {
            setEmployees([...employees, employee]);
        }
    };

    const handleDeleteEmployee = (employeeId: string) => {
        setEmployees(employees.filter(e => e.id !== employeeId));
    };

    const handleEditEmployee = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    const handleExport = () => {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Role', 'Shift', 'Status', 'Salary', 'Join Date'];
        const rows = employees.map(emp => [
            emp.id,
            emp.name,
            emp.email,
            emp.phone,
            emp.role,
            emp.shift,
            emp.status,
            emp.salary,
            emp.joinDate,
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `staff_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
            <SideBar/>

            <main className="flex-1 overflow-hidden flex flex-col w-full">
                {/* Header - Blank Space */}
                <div className="h-12 md:h-16 bg-white border-b border-slate-200"></div>

                {/* Title Section - Fixed */}
                <div className="bg-white border-b border-slate-200 p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] mb-1">
                                    Staff Management
                                </h1>
                                <p className="text-slate-600 text-sm md:text-base">
                                    Manage your hotel employees and schedules
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold hover:bg-[#1E3A8A]/10 transition-colors min-h-11 text-sm md:text-base"
                                >
                                    <Download size={18} />
                                    Export
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingEmployee(null);
                                        setIsModalOpen(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white font-bold hover:bg-[#D4AF37] transition-colors min-h-11 text-sm md:text-base cursor-pointer"
                                >
                                    <Plus size={18} />
                                    Add Staff
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards - Fixed */}
                <div className="bg-white border-b border-slate-200 p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                            <StaffStatCard
                                title="Total Staff"
                                value={stats.totalStaff}
                                trend="+12%"
                                trendUp={true}
                                icon={(props) => <span {...props}>👥</span>}
                                iconColor="royal"
                            />
                            <StaffStatCard
                                title="Active"
                                value={stats.active}
                                trend="+5%"
                                trendUp={true}
                                icon={(props) => <span {...props}>✓</span>}
                                iconColor="green"
                            />
                            <StaffStatCard
                                title="On Leave"
                                value={stats.onLeave}
                                icon={(props) => <span {...props}>⏸️</span>}
                                iconColor="golden"
                            />
                            <StaffStatCard
                                title="Roles"
                                value={stats.totalRoles}
                                icon={(props) => <span {...props}>💼</span>}
                                iconColor="purple"
                            />
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto p-4 md:p-6">
                        {/* Staff Content */}
                        <StaffContent
                            employees={employees}
                            onEdit={handleEditEmployee}
                            onDelete={handleDeleteEmployee}
                        />
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            <StaffModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingEmployee(null);
                }}
                onSave={handleAddEmployee}
                editingEmployee={editingEmployee || undefined}
            />
        </div>
    );
}

export default StaffManagementPage;
