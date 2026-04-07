export enum CostCategory {
  LOW_COST = 'LOW_COST',
  MEDIUM_COST = 'MEDIUM_COST',
  HIGH_COST = 'HIGH_COST'
}

export interface EquipmentCostAnalysis {
  equipmentId: number;
  equipmentName: string;
  equipmentRef: string;
  totalIncidentCost: number;
  totalMaintenanceCost: number;
  totalCost: number;
  preventiveMaintenanceCost: number;
  correctiveMaintenanceCost: number;
  inspectionMaintenanceCost: number;
  plannedMaintenanceCost: number;
  forecastTotalCost: number;
  costBySeverity: { [key: string]: number };
  averageCostPerIncident: number;
  averageCostPerMaintenance: number;
  preventiveCorrectiveCostRatio: number;
  monthlyCostTrend: { [key: string]: number };
  costCategory: CostCategory;
  preventiveCount: number;
  correctiveCount: number;
  inspectionCount: number;
  preventivePercentage: number;
  correctivePercentage: number;
  inspectionPercentage: number;
  avgCostPerPreventive: number;
  avgCostPerCorrective: number;
  avgCostPerInspection: number;
  incidentCorrectiveCorrelation: number;
}
