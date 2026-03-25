export type Category = 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Health' | 'Other' | 'Income' | 'Savings';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: Date;
  notes?: string;
  type: 'expense' | 'income';
}

export interface BudgetGoal {
  category: Category;
  spent: number;
  limit: number;
}
