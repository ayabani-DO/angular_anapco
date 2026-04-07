export enum TypeMaintenance {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  INSPECTION = 'INSPECTION'
}

export enum StatusMaintenance {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface Maintenance {
  idMaintenance?: number;
  refCode: string;
  typeMaintenance: TypeMaintenance;
  statusMaintenance: StatusMaintenance;
  date: string;
  description: string;
  costReal?: number;
  equipement?: { idEquipement: number; nomEquipement?: string };
}
