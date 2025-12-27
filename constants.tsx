
import { Equipment, MaintenanceTeam, MaintenanceRequest } from './types';

export const INITIAL_TEAMS: MaintenanceTeam[] = [
  {
    id: 't1',
    name: 'Mechanics',
    technicians: [
      { id: 'tech1', name: 'Rahul Sharma', avatar: 'https://i.pravatar.cc/150?u=rahul', teamId: 't1' },
      { id: 'tech2', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john', teamId: 't1' }
    ]
  },
  {
    id: 't2',
    name: 'Electricians',
    technicians: [
      { id: 'tech3', name: 'Sarah Connor', avatar: 'https://i.pravatar.cc/150?u=sarah', teamId: 't2' }
    ]
  },
  {
    id: 't3',
    name: 'IT Support',
    technicians: [
      { id: 'tech4', name: 'Kevin Mitnick', avatar: 'https://i.pravatar.cc/150?u=kevin', teamId: 't3' }
    ]
  }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'e1',
    name: 'CNC Machine 5000',
    serialNumber: 'CNC-9087',
    purchaseDate: '2023-01-15',
    warrantyUntil: '2025-01-15',
    location: 'Factory Floor 2',
    department: 'Production',
    assignedEmployee: 'Mike Brewer',
    maintenanceTeamId: 't1',
    defaultTechnicianId: 'tech1',
    status: 'Active',
    category: 'Production'
  },
  {
    id: 'e2',
    name: 'Main Server Rack',
    serialNumber: 'SRV-X11',
    purchaseDate: '2024-05-10',
    warrantyUntil: '2027-05-10',
    location: 'Server Room A',
    department: 'IT',
    assignedEmployee: 'Alice Wang',
    maintenanceTeamId: 't3',
    defaultTechnicianId: 'tech4',
    status: 'Active',
    category: 'Infrastructure'
  },
  {
    id: 'e3',
    name: 'Industrial Oven',
    serialNumber: 'OVN-442',
    purchaseDate: '2022-11-20',
    warrantyUntil: '2023-11-20',
    location: 'Canteen',
    department: 'Admin',
    maintenanceTeamId: 't2',
    defaultTechnicianId: 'tech3',
    status: 'Active',
    category: 'Kitchen'
  }
];

export const INITIAL_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'r1',
    subject: 'Overheating during operation',
    equipmentId: 'e1',
    teamId: 't1',
    technicianId: 'tech1',
    type: 'Corrective',
    scheduledDate: new Date().toISOString().split('T')[0],
    duration: 2.5,
    status: 'In Progress',
    priority: 'High'
  },
  {
    id: 'r2',
    subject: 'Quarterly Safety Inspection',
    equipmentId: 'e3',
    teamId: 't2',
    technicianId: 'tech3',
    type: 'Preventive',
    scheduledDate: '2025-10-15',
    duration: 1.0,
    status: 'New',
    priority: 'Medium'
  }
];
