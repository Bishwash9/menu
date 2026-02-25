import React, { useEffect, useState } from 'react';
import { CalendarDays, } from 'lucide-react';
import { TableModal, TableCard, TABLE_AREAS } from '../Features/Tables';
import type {  TableArea } from '../Features/Tables/Types';
import  { tableService } from '../Services/tableService';
import type { Table } from '../Types/table';
 


const TablesPage: React.FC = () => {
    const [tables, setTables] = useState<Table[]>([]); // Start with empty array
    const [loading, setLoading] = useState(true);   // Track loading state
    const [error, setError] = useState<string | null>(null);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [areaFilter, setAreaFilter] = useState<TableArea | 'All'>('All');


    useEffect(() => {
        const fetchTables = async () => {

            try{
                setLoading(true);
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                const businessId = userData.business_id;

                if(businessId){
                    const data = await tableService.getTables(businessId);

                    const mappedTables = data.map((t:Table) => ({
                        id: t.id,
                        business_id: t.business_id,
                        table_number: t.table_number,
                        location: t.location,
                        seats: t.seats,
                        status_name: t.status_name,
                        status_id: t.status_id,
                        business_name: t.business_name,
                        reserved_by: t.reserved_by,
                        created_at: t.created_at,
                        updated_at: t.updated_at,
                    }));

                    setTables(mappedTables);
                    setError(null);
                }else{
                    setError('Business ID not found. Please log in again.');
                }
            }catch(error){
                console.error('Failed to fetch tables:', error);
            }finally{
                setLoading(false);
            }
        };
        fetchTables();
    }, []);




    // Calculate stats
    const stats = {
        total: tables.length,
        available: tables.filter(t => t.status_name === 'Available').length,
        occupied: tables.filter(t => t.status_name === 'Occupied').length,
        reserved: tables.filter(t => t.status_name === 'Reserved').length,
        unavailable: tables.filter(t => t.status_name === 'Unavailable').length,
        
    };

    const filteredTables = tables.filter(t =>
        areaFilter === 'All' || t.location === areaFilter
    );

    const handleEditTable = (table: Table) => {
        setModalMode('edit');
        setSelectedTable(table);
        setIsModalOpen(true);
    };

    const handleDeleteTable = (tableId: number) => {
        setTables(tables.filter(t => t.id !== tableId));
    };

    const handleSaveTable = async (tableData: Table) => {
    try{
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const businessId = userData.business_id;

        if(businessId){
            if(modalMode === 'add'){
                const newTable = await tableService.createTable(businessId, tableData);
                setTables([...tables, newTable]);
            } 
        }
        setIsModalOpen(false);
    } catch(error){
        console.error('Failed to save table:', error);
    }
}

    

    const handleTableClick = (table: Table) => {
        // Toggle status or open order if occupied
        if (table.status_name === 'Available') {
            setTables(tables.map(t =>
                t.id === table.id ? { ...t, status_name: 'Occupied' as const } : t
            ));
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                        <CalendarDays size={18} />
                        Reservations
                    </button>
                </div>
            </div>

            {/* Area Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => setAreaFilter('All')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${areaFilter === 'All'
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
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${areaFilter === area
                            ? 'bg-[#002366] text-white shadow-md'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-[#002366]'
                            }`}
                    >
                        {area}
                    </button>
                ))}
            </div>

             {/* Loading State */}
            {loading && (
                <div className='flex justify-center items-center py-20'>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-700">{error}</p>
                </div>
            )}


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
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>  
                    <span className="text-sm text-slate-600">Unavailable ({stats.unavailable})</span>
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
            </div>

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

