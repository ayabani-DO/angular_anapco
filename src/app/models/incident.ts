export enum SeverityCode {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum EtatIncident {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

export interface Incident {
  idInncident?: number;
  severityCode: SeverityCode;
  etatIncident: EtatIncident;
  date: string;
  description: string;
  costEstimated: number;
  costReal: number;
  closedDate?: string;
}
