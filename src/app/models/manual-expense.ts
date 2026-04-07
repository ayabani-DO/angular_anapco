export enum ManualExpenseCategory {
  TRAVEL = 'TRAVEL',
  ENERGY = 'ENERGY',
  OTHER = 'OTHER'
}

export interface ManualExpense {
  id?: number;
  date: string;
  category: ManualExpenseCategory;
  amount: number;
  currencyCode?: string;
  site?: { idSite: number; nom?: string };
}
