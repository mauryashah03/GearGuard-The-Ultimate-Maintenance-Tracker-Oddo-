
import React from 'react';
import { MaintenanceRequest, Equipment, RequestStatus, MaintenanceTeam } from '../../types';
import { Clock, User, AlertCircle, CheckCircle2, Trash2, ArrowRight } from 'lucide-react';

interface MaintenanceBoardProps {
  requests: MaintenanceRequest[];
  equipment: Equipment[];
  teams: MaintenanceTeam[];
  onStatusChange: (id: string, status: RequestStatus) => void;
  onAddRequest: () => void;
}

const MaintenanceBoard: React.FC<MaintenanceBoardProps> = ({ 
  requests, 
  equipment, 
  teams,
  onStatusChange,
  onAddRequest
}) => {
  const columns: { id: RequestStatus; label: string; color: string }[] = [
    { id: 'New', label: 'Unassigned / New', color: 'bg-slate-500' },
    { id: 'In Progress', label: 'In Progress', color: 'bg-blue-600' },
    { id: 'Repaired', label: 'Completed', color: 'bg-emerald-600' },
    { id: 'Scrap', label: 'Scrapped', color: 'bg-rose-600' }
  ];

  const getEquipmentName = (id: string) => equipment.find(e => e.id === id)?.name || 'Unknown Asset';
  const getTechnician = (req: MaintenanceRequest) => {
    const team = teams.find(t => t.id === req.teamId);
    return team?.technicians.find(tech => tech.id === req.technicianId);
  };

  const isOverdue = (date: string) => new Date(date) < new Date() && date !== '';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Work Orders</h2>
          <p className="text-slate-500 font-medium">Manage maintenance life-cycle and technician assignments.</p>
        </div>
        <button 
          onClick={onAddRequest}
          className="bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center gap-3 transition-all font-bold shadow-xl shadow-slate-200"
        >
          <div className="bg-blue-500 rounded-lg p-1">
             <ArrowRight className="w-4 h-4 rotate-[-45deg]" />
          </div>
          Create Request
        </button>
      </header>

      <div className="flex gap-6 overflow-x-auto pb-10 min-h-[700px] scrollbar-hide">
        {columns.map(col => {
          const statusRequests = requests.filter(r => r.status === col.id);
          
          return (
            <div key={col.id} className="flex-shrink-0 w-[320px] flex flex-col gap-5">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.color}`}></div>
                  <h3 className="font-bold text-slate-700 uppercase tracking-widest text-[11px]">{col.label}</h3>
                  <span className="bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-lg text-[10px] font-black">
                    {statusRequests.length}
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-slate-100/40 rounded-[2rem] p-4 border border-slate-200/60 space-y-4 backdrop-blur-sm">
                {statusRequests.map(req => {
                  const tech = getTechnician(req);
                  const overdue = isOverdue(req.scheduledDate) && (req.status === 'New' || req.status === 'In Progress');

                  return (
                    <div 
                      key={req.id} 
                      className={`bg-white p-5 rounded-2xl border-l-4 ${
                        req.priority === 'High' ? 'border-l-rose-500' : 
                        req.priority === 'Medium' ? 'border-l-amber-500' : 'border-l-blue-500'
                      } shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                          req.type === 'Preventive' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {req.type}
                        </span>
                        {overdue && (
                          <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded-md text-[10px] font-bold animate-pulse">
                            <AlertCircle className="w-3 h-3" /> Overdue
                          </div>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 mb-1 leading-tight text-sm group-hover:text-blue-600 transition-colors">{req.subject}</h4>
                      <p className="text-xs text-slate-400 font-bold tracking-tight mb-4">{getEquipmentName(req.equipmentId)}</p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          {tech ? (
                            <img src={tech.avatar} alt={tech.name} className="w-7 h-7 rounded-xl object-cover ring-2 ring-slate-100" />
                          ) : (
                            <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center border border-dashed border-slate-300">
                              <User className="w-3 h-3 text-slate-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-[10px] font-black text-slate-700 leading-none">{tech?.name || 'Unassigned'}</p>
                            <p className="text-[9px] text-slate-400 font-medium mt-0.5">{req.scheduledDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded-lg">
                          <Clock className="w-3 h-3" />
                          {req.duration}h
                        </div>
                      </div>

                      {/* Quick Action Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-white/95 border-t border-slate-100 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 shadow-2xl">
                        {col.id === 'New' && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); onStatusChange(req.id, 'In Progress'); }}
                            className="flex-1 py-1.5 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 flex items-center justify-center gap-1"
                          >
                            <ArrowRight className="w-3 h-3" /> Start Job
                          </button>
                        )}
                        {col.id === 'In Progress' && (
                          <>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onStatusChange(req.id, 'Repaired'); }}
                              className="flex-1 py-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700 flex items-center justify-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" /> Complete
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onStatusChange(req.id, 'Scrap'); }}
                              className="px-3 py-1.5 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaintenanceBoard;
