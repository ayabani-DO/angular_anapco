export interface SeverityKpi {
  siteId?: number;
  year?: number;
  month?: number;
  lowCount?: number;
  mediumCount?: number;
  highCount?: number;
  criticalCount?: number;
  totalCount?: number;
  lowPercentage?: number;
  mediumPercentage?: number;
  highPercentage?: number;
  criticalPercentage?: number;
  severityIndex?: number;
  criticalRatio?: number;
  riskLevel?: string;
}

export interface LifecycleKpi {
  siteId?: number;
  year?: number;
  month?: number;
  openCount?: number;
  inProgressCount?: number;
  closedCount?: number;
  totalCount?: number;
  closureRate?: number;
  avgResolutionDays?: number;
  avgResolutionHours?: number;
  longestResolutionDays?: number;
  shortestResolutionDays?: number;
  performanceLevel?: string;
  openIncidentRatio?: number;
  inProgressRatio?: number;
}

export interface CostAnalysisKpi {
  siteId?: number;
  year?: number;
  month?: number;
  targetCurrency?: string;
  totalEstimatedCost?: number;
  totalRealCost?: number;
  totalCostVariance?: number;
  totalCostVariancePercent?: number;
  avgCostPerIncident?: number;
  avgEstimatedCostPerIncident?: number;
  avgRealCostPerIncident?: number;
  costBySeverity?: { [key: string]: number };
  costByEquipmentCategory?: { [key: string]: number };
  costPerformanceLevel?: string;
  costOverrunRatio?: number;
  totalIncidentsWithCosts?: number;
  originalCurrency?: string;
  exchangeRate?: number;
}

export interface RecurrenceKpi {
  siteId?: number;
  analysisDays?: number;
  totalIncidents?: number;
  repeatedIncidents?: number;
  recurrenceRate?: number;
  incidentsByEquipment?: { [key: string]: number };
  highRiskEquipment?: string[];
  equipmentWithMultipleIncidents?: number;
  incidentsBySite?: { [key: string]: number };
  highRiskSites?: string[];
  incidentsBySeverity?: { [key: string]: number };
  criticalIncidentsLastPeriod?: number;
  highIncidentsLastPeriod?: number;
  overallRiskLevel?: string;
  riskFactors?: string[];
  recommendations?: string[];
  incidentTrend?: number;
  trendDirection?: string;
}

export interface RiskScore {
  siteId?: number;
  equipmentId?: number;
  targetName?: string;
  targetType?: string;
  riskScore?: number;
  riskLevel?: string;
  riskCategory?: string;
  riskFactors?: string[];
  positiveFactors?: string[];
  incidentsLast30Days?: number;
  criticalIncidentsLast90Days?: number;
  highIncidentsLast30Days?: number;
  avgCostOverrunPercent?: number;
  repeatedCorrectiveMaintenance?: number;
  equipmentOutOfService?: boolean;
  recommendation?: string;
  urgencyLevel?: string;
  suggestedActions?: string[];
  analysisDate?: string;
  dataPointsAnalyzed?: number;
  confidenceScore?: number;
}

export interface IncidentDashboard {
  severityKpi?: SeverityKpi;
  lifecycleKpi?: LifecycleKpi;
  costKpi?: CostAnalysisKpi;
  recurrenceKpi?: RecurrenceKpi;
  siteRiskScore?: RiskScore;
  overallHealthStatus?: string;
  primaryRiskFactor?: string;
  topRecommendation?: string;
  lastUpdated?: string;
}

export interface TrendData {
  siteId?: number;
  analysisMonths?: number;
  trendDirection?: string;
  trendPercentage?: number;
  totalIncidentsInPeriod?: number;
  avgIncidentsPerMonth?: number;
  trendInterpretation?: string;
}

export interface SiteComparison {
  comparedSiteIds?: number[];
  year?: number;
  month?: number;
  siteNames?: { [key: number]: string };
  severityIndices?: { [key: number]: number };
  closureRates?: { [key: number]: number };
  totalCosts?: { [key: number]: number };
  riskScores?: { [key: number]: number };
  sitesByPerformance?: number[];
  sitesByRisk?: number[];
  sitesByCost?: number[];
  bestPerformingSite?: string;
  highestRiskSite?: string;
  mostCostlySite?: string;
  keyFindings?: string;
}
