export type Currency = 'USD' | 'EUR' | 'UAH';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  currency: Currency;
  category: string;
  date: string; // ISO
  note?: string;
}

export type TransactionType = Transaction['type'];

export interface TransactionFilters {
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  type?: TransactionType;
}

