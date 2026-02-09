import React, { useState } from 'react';
import { Search} from 'lucide-react';
import type { Employee, EmployeeStatus } from '../Types';
import { STATUSES } from '../data';

interface StaffContentProps {
    employees: Employee[];
    onEdit?: (employee: Employee) => void;
    onDelete?: (employeeId: string) => void;
}

export const StaffContent: React.FC<StaffContentProps> = ({
    employees,
  
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<EmployeeStatus | 'All'>('All');

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.phone.includes(searchQuery);
        const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700';
            case 'On Leave':
                return 'bg-yellow-100 text-yellow-700';
            case 'Inactive':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getShiftColor = (shift: string) => {
        switch (shift) {
            case 'Morning Shift':
                return 'text-blue-600';
            case 'Evening Shift':
                return 'text-purple-600';
            case 'Night Shift':
                return 'text-slate-600';
            default:
                return 'text-slate-600';
        }
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-end">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search staff by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-status-confirmed/20"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-status-confirmed/20"
                >
                    <option value="All">All Status</option>
                    {STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('All');
                    }}
                    className="px-4 py-2 text-[#D4AF37] font-bold hover:underline"
                >
                    Clear
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-300">
                <button className="px-4 py-2 text-[#D4AF37] font-bold border-b-2 border-[#D4AF37]">
                    All Staff
                </button>
                <button className="px-4 py-2 text-slate-600 font-bold hover:text-slate-800">
                    Active
                </button>
                <button className="px-4 py-2 text-slate-600 font-bold hover:text-slate-800">
                    On Leave
                </button>
                <button className="px-4 py-2 text-slate-600 font-bold hover:text-slate-800">
                    Recently Joined
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">EMPLOYEE</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">CONTACT</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">ROLE</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">SHIFT</th>
                                <th className="px-4 py-3 text-left font-bold text-slate-700">STATUS</th>
            
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${employee.avatarColor === 'royal' ? 'bg-status-confirmed' : 'bg-dashboard-accent'}`}>
                                                {employee.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{employee.name}</p>
                                                <p className="text-xs text-slate-500">Joined: {new Date(employee.joinDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm">
                                            <p className="text-slate-800"> {employee.email}</p>
                                            <p className="text-slate-600"> {employee.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-800 font-medium"> {employee.role}</td>
                                    <td className={`px-4 py-3 font-medium ${getShiftColor(employee.shift)}`}>
                                         {employee.shift}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(employee.status)}`}>
                                            {employee.status}
                                        </span>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredEmployees.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                    No employees found. Try adjusting your filters.
                </div>
            )}
        </div>
    );
};
