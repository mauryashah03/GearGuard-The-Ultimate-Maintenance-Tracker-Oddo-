
import React, { useState } from 'react';
import { Equipment, MaintenanceRequest } from '../../types';
import { Search, Plus, MapPin, Tag, Wrench, AlertTriangle, Calendar as CalendarIcon, Cpu, MoreHorizontal } from 'lucide-react';

interface EquipmentListProps {
  equipment: Equipment[];
  requests: MaintenanceRequest[];
  onAdd: () => void;
  onViewMaintenance: (equipmentId: string) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ 
  equipment, 
  requests, 
  onAdd, 
  onViewMaintenance 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const filtered = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || item.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const departments = ['All', ...Array.from(new Set(equipment.map(e => e.department)))];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Asset Inventory</h2>
          <p className="text-slate-500 font-medium">Monitoring {equipment.length} critical systems and machinery.</p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-3 transition-all font-bold shadow-xl shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Equipment
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm backdrop-blur-md">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search assets, serial numbers, or departments..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 px-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Filter:</span>
          <select 
            className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer text-slate-700"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(item => {
          const openRequests = requests.filter(r => r.equipmentId === item.id && (r.status === 'New' || r.status === 'In Progress')).length;
          const isScrapped = item.status === 'Scrapped';

          return (
            <div key={item.id} className={`bg-white rounded-[2.5rem] border-2 ${isScrapped ? 'border-rose-100 bg-rose-50/20' : 'border-slate-100'} shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative`}>
              {/* Asset Badge */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isScrapped ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6'
                  }`}>
                    <Cpu className="w-7 h-7" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      isScrapped ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.status}
                    </span>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <h3 className="font-black text-xl text-slate-900 mb-1 tracking-tight">{item.name}</h3>
                <p className="text-xs text-slate-400 font-bold mb-6 flex items-center gap-2">
                   <Tag className="w-3 h-3" /> {item.serialNumber}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-xs font-bold text-slate-700 truncate">{item.location}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dept</p>
                    <p className="text-xs font-bold text-slate-700 truncate">{item.department}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => onViewMaintenance(item.id)}
                    className="flex-1 flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-[#0F172A] text-white hover:bg-slate-800 transition-all text-xs font-black shadow-lg shadow-slate-200"
                  >
                    <Wrench className="w-4 h-4" />
                    Maintenance ({openRequests})
                  </button>
                  {openRequests > 0 && (
                    <div className="ml-4 flex-shrink-0 w-11 h-11 bg-amber-100 flex items-center justify-center rounded-2xl text-amber-600 animate-pulse">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative Accent */}
              {!isScrapped && (
                <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentList;
