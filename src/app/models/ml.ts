export interface MlPrediction {
  siteId?: number;
  year?: number;
  month?: number;
  predictedValue?: number;
  confidence?: number;
  modelVersion?: string;
  features?: { [key: string]: number };
}

export interface MlExplanation {
  siteId?: number;
  year?: number;
  month?: number;
  shapValues?: { [key: string]: number };
  topFeatures?: string[];
  baseValue?: number;
  predictedValue?: number;
}

export interface MlHealth {
  status?: string;
  costModelReady?: boolean;
  riskModelReady?: boolean;
  lastTrainingDate?: string;
  trainingDataSize?: number;
  costModelMetrics?: { [key: string]: number };
  riskModelMetrics?: { [key: string]: number };
}

export interface MlFeature {
  id?: number;
  siteId?: number;
  year?: number;
  month?: number;
  incidentCount?: number;
  criticalIncidentCount?: number;
  maintenanceCost?: number;
  incidentCost?: number;
  oilPrice?: number;
  energyPrice?: number;
  targetCost?: number;
  targetRisk?: string;
}
