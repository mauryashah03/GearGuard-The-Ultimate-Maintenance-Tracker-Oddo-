
import React, { useState } from 'react';
import { MaintenanceRequest, Equipment } from '../../types';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarViewProps {
  requests: MaintenanceRequest[];
  equipment: Equipment[];
  onAddRequest: (date: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ requests, equipment, onAddRequest }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const preventiveRequests = requests.filter(r => r.type === 'Preventive');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    return { firstDay, days };
  };

  const { firstDay, days } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= days; i++) calendarDays.push(i);

  const getRequestsForDay = (day: number) => {
    const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return preventiveRequests.filter(r => r.scheduledDate === dateStr);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Preventive Schedule</h2>
          <p className="text-slate-500">Plan and coordinate routine inspections.</p>
        </div>
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
          <span className="px-4 font-bold text-slate-800 min-w-[140px] text-center">{monthName} {year}</span>
          <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded text-slate-600"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            const dayRequests = day ? getRequestsForDay(day) : [];
            return (
              <div 
                key={i} 
                className={`min-h-[120px] border-r border-b border-slate-100 p-2 group relative transition-colors ${
                  day ? 'hover:bg-slate-50/50 cursor-pointer' : 'bg-slate-50/20'
                }`}
                onClick={() => {
                  if (day) {
                    const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    onAddRequest(dateStr);
                  }
                }}
              >
                {day && (
                  <>
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold text-slate-600">{day}</span>
                      <Plus className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 space-y-1">
                      {dayRequests.map(req => (
                        <div key={req.id} className="text-[10px] bg-indigo-100 text-indigo-700 p-1 rounded font-medium truncate border border-indigo-200">
                          {req.subject}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
