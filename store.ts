
import { useState, useEffect, useCallback } from 'react';
import { Equipment, MaintenanceTeam, MaintenanceRequest, RequestStatus, EquipmentStatus } from './types';
import { INITIAL_EQUIPMENT, INITIAL_TEAMS, INITIAL_REQUESTS } from './constants';

export function useMaintenanceStore() {
  const [equipment, setEquipment] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [teams, setTeams] = useState<MaintenanceTeam[]>(INITIAL_TEAMS);
  const [requests, setRequests] = useState<MaintenanceRequest[]>(INITIAL_REQUESTS);

  const updateRequestStatus = (requestId: string, newStatus: RequestStatus) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        // Handle scrap logic
        if (newStatus === 'Scrap') {
          updateEquipmentStatus(req.equipmentId, 'Scrapped');
        }
        return { ...req, status: newStatus };
      }
      return req;
    }));
  };

  const updateEquipmentStatus = (equipmentId: string, status: EquipmentStatus) => {
    setEquipment(prev => prev.map(e => e.id === equipmentId ? { ...e, status } : e));
  };

  const addRequest = (request: Omit<MaintenanceRequest, 'id'>) => {
    const newReq: MaintenanceRequest = {
      ...request,
      id: `r-${Math.random().toString(36).substr(2, 9)}`
    };
    setRequests(prev => [...prev, newReq]);
  };

  const addEquipment = (item: Omit<Equipment, 'id'>) => {
    const newItem: Equipment = {
      ...item,
      id: `e-${Math.random().toString(36).substr(2, 9)}`
    };
    setEquipment(prev => [...prev, newItem]);
  };

  return {
    equipment,
    teams,
    requests,
    updateRequestStatus,
    updateEquipmentStatus,
    addRequest,
    addEquipment
  };
}
