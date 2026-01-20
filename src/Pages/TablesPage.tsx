import React, { useState } from 'react';
import { Plus, CalendarDays, Users } from 'lucide-react';
import { SideBar } from '../Components/Layout/Sidebar';
import { TableModal, TableCard, initialTables, TABLE_AREAS } from '../Features/Tables';
import type { Table, TableArea } from '../Features/Tables/types';

const TablesPage: React.FC = () => {
    const [tables, setTables] = useState<Table[]>(initialTables);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [areaFilter, setAreaFilter] = useState<TableArea | 'All'>('All');

    // Calculate stats
    const stats = {
        total: tables.length,
        available: tables.filter(t => t.status === 'Available').length,
        occupied: tables.filter(t => t.status === 'Occupied').length,
        reserved: tables.filter(t => t.status === 'Reserved').length,
        totalCapacity: tables.reduce((sum, t) => sum + t.seats, 0),
    };

    const filteredTables = tables.filter(t => 
        areaFilter === 'All' || t.area === areaFilter
    );

    const handleAddTable = () => {
        setModalMode('add');
        setSelectedTable(null);
        setIsModalOpen(true);
    };

    const handleEditTable = (table: Table) => {
        setModalMode('edit');
        setSelectedTable(table);
        setIsModalOpen(true);
    };

    const handleDeleteTable = (tableId: string) => {
        setTables(tables.filter(t => t.id !== tableId));
    };

    const handleSaveTable = (tableData: Omit<Table, 'id'> | Table) => {
        if ('id' in tableData) {
            setTables(tables.map(t => t.id === tableData.id ? tableData : t));
        } else {
            const newTable: Table = {
                ...tableData,
                id: Date.now().toString(),
            };
            setTables([...tables, newTable]);
        }
    };

    const handleTableClick = (table: Table) => {
        // Toggle status or open order if occupied
        if (table.status === 'Available') {
            setTables(tables.map(t => 
                t.id === table.id ? { ...t, status: 'Occupied' as const } : t
            ));
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            <SideBar/>
            
            <main className="flex-1 overflow-auto">
                {/* Header Space */}
                <div className="h-16 bg-white border-b border-slate-200"></div>
                
                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#002366]">Table Management</h1>
                            <p className="text-slate-500">Real-time restaurant floor plan</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                                <CalendarDays size={18} />
                                Reservations
                            </button>
                            <button
                                onClick={handleAddTable}
                                className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#b8962e] transition-colors shadow-sm"
                            >
                                <Plus size={18} />
                                Add Table
                            </button>
                        </div>
                    </div>

                    {/* Area Filters */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <button
                            onClick={() => setAreaFilter('All')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                areaFilter === 'All'
                                    ? 'bg-[#002366] text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#002366]'
                            }`}
                        >
                            All
                        </button>
                        {TABLE_AREAS.map(area => (
                            <button
                                key={area}
                                onClick={() => setAreaFilter(area)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    areaFilter === area
                                        ? 'bg-[#002366] text-white shadow-md'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-[#002366]'
                                }`}
                            >
                                {area}
                            </button>
                        ))}
                    </div>

                    {/* Status Legend */}
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            <span className="text-sm text-slate-600">Available ({stats.available})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            <span className="text-sm text-slate-600">Occupied ({stats.occupied})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                            <span className="text-sm text-slate-600">Reserved ({stats.reserved})</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <Users size={16} className="text-slate-400" />
                            <span className="text-sm text-slate-600">Total Capacity ({stats.totalCapacity})</span>
                        </div>
                    </div>

                    {/* Tables Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredTables.map(table => (
                            <TableCard
                                key={table.id}
                                table={table}
                                onEdit={handleEditTable}
                                onDelete={handleDeleteTable}
                                onClick={handleTableClick}
                            />
                        ))}
                        
                        {/* Add Table Card */}
                        <div
                            onClick={handleAddTable}
                            className="bg-white rounded-xl border-2 border-dashed border-slate-300 hover:border-[#002366] cursor-pointer p-5 flex flex-col items-center justify-center min-h-35 transition-all hover:shadow-md group"
                        >
                            <Plus size={24} className="text-slate-400 group-hover:text-[#002366] mb-2" />
                            <span className="text-sm text-slate-500 group-hover:text-[#002366]">Add Table</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal */}
            <TableModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTable}
                table={selectedTable}
                mode={modalMode}
            />
        </div>
    );
};

export default TablesPage;
