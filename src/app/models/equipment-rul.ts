export enum RulCategory {
  RUL_LONG = 'RUL_LONG',
  RUL_MEDIUM = 'RUL_MEDIUM',
  RUL_SHORT = 'RUL_SHORT'
}

export interface EquipmentRul {
  equipmentId: number;
  equipmentName: string;
  equipmentRef: string;
  rulScore: number;
  rulCategory: RulCategory;
  estimatedRemainingDays: number;
  mtbf: number;
  mttr: number;
  recentIncidentCount: number;
  recentCorrectiveMaintenanceCount: number;
  recentAverageCost: number;
  mainFactors: string[];
  recommendedAction: string;
  analysisDate: string;
}
