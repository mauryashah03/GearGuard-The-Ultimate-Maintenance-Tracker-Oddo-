
import React, { useState } from 'react';
import { MaintenanceTeam, Equipment } from '../../types';
import { X } from 'lucide-react';

interface EquipmentFormProps {
  teams: MaintenanceTeam[];
  onClose: () => void;
  onSubmit: (item: Omit<Equipment, 'id'>) => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ teams, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    warrantyUntil: '',
    location: '',
    department: 'Production',
    maintenanceTeamId: teams[0]?.id || '',
    defaultTechnicianId: teams[0]?.technicians[0]?.id || '',
    status: 'Active' as const,
    category: 'General'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const selectedTeam = teams.find(t => t.id === formData.maintenanceTeamId);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 my-auto">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Register New Asset</h3>
            <p className="text-slate-500 text-sm">Add equipment to the inventory system.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Equipment Name</label>
              <input
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g. Forklift X2"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Serial Number</label>
              <input
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="SN-000-000"
                value={formData.serialNumber}
                onChange={e => setFormData({...formData, serialNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none"
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
              >
                <option value="Production">Production</option>
                <option value="IT">IT Infrastructure</option>
                <option value="Logistics">Logistics</option>
                <option value="Admin">Administration</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
              <input
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g. Warehouse B, Bay 4"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Maintenance Team</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none"
                value={formData.maintenanceTeamId}
                onChange={e => {
                   const team = teams.find(t => t.id === e.target.value);
                   setFormData({...formData, maintenanceTeamId: e.target.value, defaultTechnicianId: team?.technicians[0]?.id || ''});
                }}
              >
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Warranty Until</label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                value={formData.warrantyUntil}
                onChange={e => setFormData({...formData, warrantyUntil: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all hover:scale-[1.02]"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white hover:opacity-90 transition-all shadow-xl shadow-blue-500/20 hover:scale-[1.02]"
            >
              Add Equipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EquipmentForm;
