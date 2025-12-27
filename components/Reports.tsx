
import React from 'react';
import { Equipment, MaintenanceRequest, MaintenanceTeam } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';

interface ReportsProps {
  equipment: Equipment[];
  requests: MaintenanceRequest[];
  teams: MaintenanceTeam[];
}

const Reports: React.FC<ReportsProps> = ({ equipment, requests, teams }) => {
  const statusData = [
    { name: 'New', value: requests.filter(r => r.status === 'New').length, color: '#94a3b8' },
    { name: 'In Progress', value: requests.filter(r => r.status === 'In Progress').length, color: '#3b82f6' },
    { name: 'Repaired', value: requests.filter(r => r.status === 'Repaired').length, color: '#22c55e' },
    { name: 'Scrapped', value: requests.filter(r => r.status === 'Scrap').length, color: '#ef4444' },
  ];

  const typeData = [
    { name: 'Corrective', value: requests.filter(r => r.type === 'Corrective').length, color: '#f59e0b' },
    { name: 'Preventive', value: requests.filter(r => r.type === 'Preventive').length, color: '#6366f1' },
  ];

  const teamEfficiency = teams.map(team => {
    const teamReqs = requests.filter(r => r.teamId === team.id);
    const completed = teamReqs.filter(r => r.status === 'Repaired').length;
    return {
      name: team.name,
      completed,
      total: teamReqs.length
    };
  });

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Analytics & Insights</h2>
        <p className="text-slate-500 mt-1">Operational metrics and performance tracking.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-8">Request Distribution by Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-8">Team Completion Rates</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamEfficiency} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#22c55e" name="Repaired" radius={[0, 4, 4, 0]} />
                <Bar dataKey="total" fill="#e2e8f0" name="Total Requests" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Asset Health Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
             <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Assets</p>
             <p className="text-4xl font-black text-slate-900">{equipment.length}</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
             <p className="text-green-600 text-sm font-semibold uppercase tracking-wider mb-2">Operational</p>
             <p className="text-4xl font-black text-green-700">{equipment.filter(e => e.status === 'Active').length}</p>
          </div>
          <div className="p-6 bg-red-50 rounded-xl border border-red-100">
             <p className="text-red-600 text-sm font-semibold uppercase tracking-wider mb-2">Scrapped</p>
             <p className="text-4xl font-black text-red-700">{equipment.filter(e => e.status === 'Scrapped').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
