import { useState, useEffect } from 'react';
import { Plus, Users, UserCheck, UserX, Briefcase } from 'lucide-react';
import {
    StaffStatCard,
    StaffModal,
    StaffContent,
    type Employee,
} from '../Features/StaffManagement';
import { useAuth } from '../Context/AuthContext';
import { staffService } from '../Services/staffService';

function StaffManagementPage() {
    const { user } = useAuth();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Employee | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch staff data on component mount
    useEffect(() => {
        fetchStaff();
    }, []);

   const fetchStaff = async () => {
    if(!user?.business_id){
        setError('Business ID not found. Please log in again.');
        return;
    }

    setIsLoading(true);
    setError('')
    try {
        const response = await staffService.getStaff(user?.business_id);
        setEmployees(response || []);
    } catch (err: any) {
        setError(err.message || 'Failed to fetch staff');
    } finally {
        setIsLoading(false);
    }
};;

    // Calculate stats from actual data
    const stats = {
        totalStaff: employees.length,
        active: employees.filter(e => e.status_name.toLowerCase() === 'active').length,
        onLeave: employees.filter(e => e.status_name.toLowerCase() === 'on leave').length,
        totalRoles: new Set(employees.map(e => e.role_name)).size,
    };

    const handleViewStaff = (staff: Employee) => {
        setSelectedStaff(staff);
        setIsModalOpen(true);
    };

    const handleAddStaff = () => {
        // TODO: Implement when API endpoint is ready
        alert('Add staff feature coming soon!');
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              
                <button
                    onClick={handleAddStaff}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#002366] text-white font-bold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                >
                    <Plus size={18} />
                    Add Staff
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 px-4 py-3 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

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
                {isLoading ? (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                        <p className="text-slate-500">Loading staff data...</p>
                    </div>
                ) : employees.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                        <p className="text-slate-500">No staff members yet. Add your first team member!</p>
                    </div>
                ) : (
                    <StaffContent
                        employees={employees}
                        onEdit={handleViewStaff}
                        onDelete={() => {}}
                    />
                )}
            </div>

            {/* Staff Details Modal */}
            <StaffModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedStaff(null);
                }}
                staff={selectedStaff || undefined}
            />
        </div>
    );
}

export default StaffManagementPage;