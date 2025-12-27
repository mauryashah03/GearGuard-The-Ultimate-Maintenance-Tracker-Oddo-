
export type RequestStatus = 'New' | 'In Progress' | 'Repaired' | 'Scrap';
export type RequestType = 'Corrective' | 'Preventive';
export type EquipmentStatus = 'Active' | 'Scrapped';

export interface Technician {
  id: string;
  name: string;
  avatar: string;
  teamId: string;
}

export interface MaintenanceTeam {
  id: string;
  name: string;
  technicians: Technician[];
}

export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyUntil: string;
  location: string;
  department: string;
  assignedEmployee?: string;
  maintenanceTeamId: string;
  defaultTechnicianId: string;
  status: EquipmentStatus;
  category: string;
}

export interface MaintenanceRequest {
  id: string;
  subject: string;
  equipmentId: string;
  teamId: string;
  technicianId: string;
  type: RequestType;
  scheduledDate: string;
  duration: number; // in hours
  status: RequestStatus;
  priority: 'Low' | 'Medium' | 'High';
  notes?: string;
}
