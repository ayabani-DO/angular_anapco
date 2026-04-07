export interface FinanceKpi {
  siteId?: number;
  year?: number;
  month?: number;
  budgetEur?: number;
  realEur?: number;
  varianceEur?: number;
  variancePercent?: number;
  forecastEur?: number;
  varianceForecastEur?: number;
  varianceForecastPercent?: number;
  riskLevel?: string;
}
