import React from 'react';
import { Users, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import type { Table } from '../../../Types/table';

interface TableCardProps {
    table: Table;
    onEdit?: (table: Table) => void;
    onDelete?: (tableId: number) => void;
    onClick?: (table: Table) => void;
}

export const TableCard: React.FC<TableCardProps> = ({
    table,
    onEdit,
    onDelete,
    onClick,
}) => {
    const [showMenu, setShowMenu] = React.useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available':
                return 'bg-green-500';
            case 'Occupied':
                return 'bg-blue-500';
            case 'Reserved':
                return 'bg-orange-500';
            case 'Unavailable':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getBorderColor = (status: string) => {
        switch (status) {
            case 'Available':
                return 'border-green-200 hover:border-green-400';
            case 'Occupied':
                return 'border-blue-200 hover:border-blue-400';
            case 'Reserved':
                return 'border-orange-200 hover:border-orange-400';
            case 'Unavailable':
                return 'border-red-200 hover:border-red-400';
            default:
                return 'border-slate-200';
        }
    };

    return (
        <div 
            className={`relative bg-white rounded-xl border-2 ${getBorderColor(table.status_name)} shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-5`}
            onClick={() => onClick?.(table)}
        >
            {/* Status Indicator */}
            <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getStatusColor(table.status_name)}`} />

            {/* Menu Button */}
            <div className="absolute top-2 right-8">
                <button
                    onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                    className="p-1 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                    <MoreVertical size={14} className="text-slate-400" />
                </button>
                {showMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-25 z-10">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit?.(table); setShowMenu(false); }}
                            className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                        >
                            <Edit2 size={14} /> Edit
                        </button>
                        <button
                            onClick={(e) => { 
                                e.stopPropagation();
                                if (confirm(`Delete table ${table.table_number}?`)) {
                                    onDelete?.(table.id);
                                }
                                setShowMenu(false); 
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="text-center">
                
                
                <h3 className="text-xl font-bold text-[#002366]">{table.table_number}</h3>
                
                <p className="text-sm text-slate-500 mt-1">
                        <Users size={14} className="inline mr-1" />
                        {table.seats} Seats
                    </p>
                
                <p className="text-xs text-slate-400 mt-2">{table.location}</p>
            </div>
        </div>
    );
};
