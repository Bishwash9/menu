import { useState } from 'react';
import { SideBar } from '../Components/Layout/Sidebar';
import { Plus, Users, UserCheck, UserX, Briefcase } from 'lucide-react';
import {
    StaffStatCard,
    StaffModal,
    StaffContent,
    MOCK_EMPLOYEES,
    type Employee,
} from '../Features/StaffManagement';
import { DashboardHeader } from '../Components/Layout';

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

    return (
        <div className="flex h-screen bg-dashboard-bg">
            <SideBar />

            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200">
                    <DashboardHeader />
                </div>

                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6">
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setEditingEmployee(null);
                                    setIsModalOpen(true);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-dashboard-primary text-white font-bold hover:bg-dashboard-accent transition-colors shadow-sm cursor-pointer"
                            >
                                <Plus size={18} />
                                Add Staff
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StaffStatCard
                            title="Total Staff"
                            value={stats.totalStaff}
                            
             
                            icon={<Users size={20} />}
                            iconColor="royal"
                        />
                        <StaffStatCard
                            title="Active"
                            value={stats.active}
                            
                          
                            icon={<UserCheck size={20} />}
                            iconColor="green"
                        />
                        <StaffStatCard
                            title="On Leave"
                            value={stats.onLeave}
                            icon={<UserX size={20} />}
                            iconColor="golden"
                        />
                        <StaffStatCard
                            title="Roles"
                            value={stats.totalRoles}
                            icon={<Briefcase size={20} />}
                            iconColor="purple"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-6">
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
