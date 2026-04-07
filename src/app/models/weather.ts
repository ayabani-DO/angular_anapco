export interface WeatherData {
  id?: number;
  siteId: number;
  date: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  precipitation?: number;
  pressure?: number;
  weatherCode?: number;
  source?: string;
}

export enum AlertStatus {
  OPEN = 'OPEN',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED'
}

export interface WeatherAlert {
  id?: number;
  siteId: number;
  alertType: string;
  severity: string;
  message: string;
  status: AlertStatus;
  createdAt?: string;
}

export interface Recommendation {
  id?: number;
  siteId: number;
  message: string;
  priority: string;
  createdAt?: string;
}

export interface WeatherRiskAssessment {
  id?: number;
  siteId: number;
  riskScore: number;
  riskLevel: string;
  details: string;
  assessedAt?: string;
}

export interface WeatherSiteOverview {
  siteId: number;
  latestWeatherData?: WeatherData;
  latestAssessment?: WeatherRiskAssessment;
  alerts: WeatherAlert[];
  recommendations: Recommendation[];
}
