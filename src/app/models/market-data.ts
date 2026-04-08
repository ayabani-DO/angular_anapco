export interface OilPrice {
  id?: number;
  date: string;
  price: number;
  currency?: string;
  source?: string;
}

export interface EnergyPrice {
  id?: number;
  countryCode: string;
  date: string;
  price: number;
  currency?: string;
  source?: string;
}
