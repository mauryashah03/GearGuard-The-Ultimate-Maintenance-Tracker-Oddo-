
import React from 'react';
import { Equipment, MaintenanceRequest, MaintenanceTeam } from '../types';
import { Box, ClipboardList, CheckCircle, AlertCircle, Wrench, ArrowUpRight, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  equipment: Equipment[];
  requests: MaintenanceRequest[];
  teams: MaintenanceTeam[];
}

const Dashboard: React.FC<DashboardProps> = ({ equipment, requests, teams }) => {
  const activeRequests = requests.filter(r => r.status !== 'Repaired' && r.status !== 'Scrap').length;
  const criticalItems = requests.filter(r => r.priority === 'High' && r.status !== 'Repaired').length;
  const totalAssets = equipment.length;
  const repairedLastWeek = requests.filter(r => r.status === 'Repaired').length;

  const stats = [
    { label: 'Active Assets', value: totalAssets, trend: '+12%', icon: Box, color: 'text-blue-600', bg: 'bg-blue-100/50', border: 'border-blue-100' },
    { label: 'Pending Jobs', value: activeRequests, trend: '-2%', icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-100/50', border: 'border-amber-100' },
    { label: 'Critical Alert', value: criticalItems, trend: 'High', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-100/50', border: 'border-rose-100' },
    { label: 'Total Experts', value: teams.reduce((acc, t) => acc + t.technicians.length, 0), trend: 'Stable', icon: Wrench, color: 'text-indigo-600', bg: 'bg-indigo-100/50', border: 'border-indigo-100' },
  ];

  const data = teams.map(team => ({
    name: team.name,
    requests: requests.filter(r => r.teamId === team.id).length
  }));

  const colors = ['#3b82f6', '#8b5cf6', '#6366f1', '#ec4899'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Pulse</h2>
          <p className="text-slate-500 font-medium text-lg mt-1">Operational health monitoring and maintenance flow.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-green-100 text-green-700 px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 text-sm">
             <TrendingUp className="w-4 h-4" />
             98.2% Uptime
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`bg-white p-8 rounded-3xl border-2 ${stat.border} shadow-sm hover:shadow-xl transition-all group cursor-default hover:scale-[1.03]`}>
              <div className="flex items-start justify-between">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl transition-transform group-hover:rotate-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-full ${i === 2 ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="mt-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-5xl font-black text-slate-900 mt-2">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900">Workload Intelligence</h3>
            <div className="text-sm font-bold text-slate-400">Monthly View</div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dx={-15} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="requests" radius={[12, 12, 0, 0]} barSize={50}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} fillOpacity={0.9} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e293b] p-10 rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <h3 className="text-2xl font-black text-white mb-8 z-10">Live Activity</h3>
          <div className="space-y-6 overflow-y-auto max-h-[450px] pr-2 z-10 custom-scrollbar">
            {requests.slice(-6).reverse().map(req => (
              <div key={req.id} className="flex gap-5 p-4 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-black text-white group-hover:from-blue-500 group-hover:to-indigo-600 transition-all shadow-lg">
                  {req.subject[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{req.subject}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {equipment.find(e => e.id === req.equipmentId)?.name}
                  </p>
                </div>
                <div className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg h-fit ${
                  req.status === 'Repaired' ? 'bg-green-500/20 text-green-400' :
                  req.status === 'Scrap' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {req.status}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-blue-400 font-bold text-sm flex items-center gap-2 hover:text-blue-300 transition-colors z-10">
            View full log <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
