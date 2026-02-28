import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Staff as Employee } from '../../../Types/staff';

interface StaffContentProps {
    employees: Employee[];
    onEdit?: (employee: Employee) => void;
    onDelete?: (employeeId: string) => void;
}

export const StaffContent: React.FC<StaffContentProps> = ({
    employees,

}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const uniqueStatuses = ['All', ...new Set(employees.map(emp => emp.status_name))];

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = 
            emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.phone.includes(searchQuery);
        const matchesStatus = statusFilter === 'All' || emp.status_name === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-700';
            case 'on leave':
                return 'bg-yellow-100 text-yellow-700';
            case 'inactive':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

  

   
    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-end">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search staff by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                >
                    {uniqueStatuses.map(status => (
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

            {/* Staff List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Phone</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Shift</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(emp => (
                            <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-800">{emp.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{emp.phone}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{emp.role_name}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{emp.shift_name}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(emp.status_name)}`}>
                                        {emp.status_name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(emp.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredEmployees.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                        No staff members found
                    </div>
                )}
            </div>
        </div>
    );
};
