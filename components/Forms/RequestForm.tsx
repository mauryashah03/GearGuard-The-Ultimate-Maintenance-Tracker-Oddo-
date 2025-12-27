
import React, { useState, useEffect } from 'react';
import { Equipment, MaintenanceTeam, MaintenanceRequest, RequestType } from '../../types';
import { X } from 'lucide-react';

interface RequestFormProps {
  equipment: Equipment[];
  teams: MaintenanceTeam[];
  initialDate?: string;
  onClose: () => void;
  onSubmit: (req: Omit<MaintenanceRequest, 'id'>) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ 
  equipment, 
  teams, 
  initialDate,
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    subject: '',
    equipmentId: '',
    teamId: '',
    technicianId: '',
    type: 'Corrective' as RequestType,
    scheduledDate: initialDate || new Date().toISOString().split('T')[0],
    duration: 1.0,
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    notes: ''
  });

  // Auto-fill logic when equipment is selected
  useEffect(() => {
    if (formData.equipmentId) {
      const selectedEquipment = equipment.find(e => e.id === formData.equipmentId);
      if (selectedEquipment) {
        setFormData(prev => ({
          ...prev,
          teamId: selectedEquipment.maintenanceTeamId,
          technicianId: selectedEquipment.defaultTechnicianId
        }));
      }
    }
  }, [formData.equipmentId, equipment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'New'
    });
    onClose();
  };

  const selectedTeam = teams.find(t => t.id === formData.teamId);

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900">New Maintenance Request</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
            <input
              required
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Engine noise during startup"
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Equipment</label>
              <select
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.equipmentId}
                onChange={e => setFormData({...formData, equipmentId: e.target.value})}
              >
                <option value="">Select Asset</option>
                {equipment.filter(e => e.status === 'Active').map(e => (
                  <option key={e.id} value={e.id}>{e.name} ({e.serialNumber})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Request Type</label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as RequestType})}
              >
                <option value="Corrective">Corrective (Breakdown)</option>
                <option value="Preventive">Preventive (Routine)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Maintenance Team</label>
              <select
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.teamId}
                onChange={e => setFormData({...formData, teamId: e.target.value, technicianId: ''})}
              >
                <option value="">Select Team</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Technician</label>
              <select
                required
                disabled={!formData.teamId}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                value={formData.technicianId}
                onChange={e => setFormData({...formData, technicianId: e.target.value})}
              >
                <option value="">Select Staff</option>
                {selectedTeam?.technicians.map(tech => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Scheduled Date</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.scheduledDate}
                onChange={e => setFormData({...formData, scheduledDate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Priority</label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value as any})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-blue-600 font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
