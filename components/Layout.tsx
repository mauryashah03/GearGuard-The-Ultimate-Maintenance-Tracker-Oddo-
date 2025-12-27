
import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  ClipboardList, 
  Calendar, 
  Box,
  Wrench,
  BarChart3,
  HelpCircle
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'equipment', label: 'Assets', icon: Box },
    { id: 'maintenance', label: 'Kanban', icon: ClipboardList },
    { id: 'calendar', label: 'Schedule', icon: Calendar },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'reports', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0F172A] text-white fixed h-full flex flex-col z-20 shadow-2xl">
        <div className="p-8 flex items-center gap-4 border-b border-slate-800/50">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-900/20">
            <Wrench className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">GearGuard</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Maintenance Pro</p>
          </div>
        </div>
        
        <nav className="flex-1 mt-8 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-semibold">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 space-y-2 border-t border-slate-800/50">
          <button className="flex items-center gap-4 px-4 py-3 w-full text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800/50">
            <HelpCircle className="w-5 h-5" />
            <span className="font-semibold">Support</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-3 w-full text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800/50">
            <Settings className="w-5 h-5" />
            <span className="font-semibold">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between">
           <div className="flex items-center gap-2 text-slate-400">
             <span className="text-sm font-medium">Home</span>
             <span className="text-sm">/</span>
             <span className="text-sm font-bold text-slate-900 capitalize">{activeView}</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors">
                JD
              </div>
           </div>
        </header>
        <div className="p-8 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
