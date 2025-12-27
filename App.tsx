
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EquipmentList from './components/Equipment/EquipmentList';
import MaintenanceBoard from './components/Maintenance/MaintenanceBoard';
import CalendarView from './components/Maintenance/CalendarView';
import RequestForm from './components/Forms/RequestForm';
import EquipmentForm from './components/Forms/EquipmentForm';
import Reports from './components/Reports';
import { useMaintenanceStore } from './store';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [prefilledDate, setPrefilledDate] = useState<string | undefined>();
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | undefined>();

  const { 
    equipment, 
    teams, 
    requests, 
    updateRequestStatus, 
    addRequest,
    addEquipment 
  } = useMaintenanceStore();

  const handleCreateRequest = (date?: string, equipmentId?: string) => {
    setPrefilledDate(date);
    setSelectedEquipmentId(equipmentId);
    setShowRequestForm(true);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard equipment={equipment} requests={requests} teams={teams} />;
      case 'equipment':
        return (
          <EquipmentList 
            equipment={equipment} 
            requests={requests} 
            onAdd={() => setShowEquipmentForm(true)}
            onViewMaintenance={(id) => {
              setActiveView('maintenance');
            }}
          />
        );
      case 'maintenance':
        return (
          <MaintenanceBoard 
            requests={requests} 
            equipment={equipment} 
            teams={teams}
            onStatusChange={updateRequestStatus}
            onAddRequest={() => handleCreateRequest()}
          />
        );
      case 'calendar':
        return (
          <CalendarView 
            requests={requests} 
            equipment={equipment} 
            onAddRequest={(date) => handleCreateRequest(date)}
          />
        );
      case 'teams':
        return (
          <div className="space-y-8">
            <header>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center md:text-left">Workforce Directory</h2>
              <p className="text-slate-500 mt-1 text-center md:text-left">Management of specialized technician groups.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teams.map(team => (
                <div key={team.id} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                    {team.name}
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{team.technicians.length} Members</span>
                  </h3>
                  <div className="space-y-4">
                    {team.technicians.map(tech => (
                      <div key={tech.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                        <img src={tech.avatar} alt={tech.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{tech.name}</p>
                          <p className="text-xs text-slate-500 font-medium tracking-tight">Lead Specialist</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return <Reports equipment={equipment} requests={requests} teams={teams} />;
      default:
        return <Dashboard equipment={equipment} requests={requests} teams={teams} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}

      {showRequestForm && (
        <RequestForm 
          equipment={equipment} 
          teams={teams} 
          initialDate={prefilledDate}
          onClose={() => setShowRequestForm(false)}
          onSubmit={addRequest}
        />
      )}

      {showEquipmentForm && (
        <EquipmentForm 
          teams={teams}
          onClose={() => setShowEquipmentForm(false)}
          onSubmit={addEquipment}
        />
      )}
    </Layout>
  );
};

export default App;
