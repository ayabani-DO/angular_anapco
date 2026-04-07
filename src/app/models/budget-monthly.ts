export interface BudgetMonthly {
  id?: number;
  year: number;
  month: number;
  amount: number;
  currencyCode?: string;
  site?: { idSite: number; nom?: string };
}
