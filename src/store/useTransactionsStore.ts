import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, TransactionFilters, Currency } from '@/features/transactions/types';
import { isDateOnOrBeforeToday } from '@/utils/date';

interface TransactionsState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  clearAllTransactions: () => void;
  getFilteredTransactions: (filters?: TransactionFilters) => Transaction[];
  getTransactionsByCategory: (category: string) => Transaction[];
  getTotalIncome: (currency?: Currency) => number;
  getTotalExpense: (currency?: Currency) => number;
  getBalance: (currency?: Currency) => number;
  getUsedCurrencies: () => Currency[];
}

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },

      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t,
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      clearAllTransactions: () => {
        set({ transactions: [] });
      },

      getFilteredTransactions: (filters = {}) => {
        const { transactions } = get();
        let filtered = [...transactions];

        if (filters.dateFrom) {
          filtered = filtered.filter(
            (t) => new Date(t.date) >= new Date(filters.dateFrom!),
          );
        }

        if (filters.dateTo) {
          filtered = filtered.filter(
            (t) => new Date(t.date) <= new Date(filters.dateTo!),
          );
        }

        if (filters.category) {
          filtered = filtered.filter((t) => t.category === filters.category);
        }

        if (filters.type) {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        return filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      },

      getTransactionsByCategory: (category) => {
        return get().transactions.filter((t) => t.category === category);
      },

      getTotalIncome: (currency) => {
        const transactions = get().transactions.filter(
          (t) => t.type === 'income' && isDateOnOrBeforeToday(t.date),
        );
        if (currency) {
          return transactions
            .filter((t) => t.currency === currency)
            .reduce((sum, t) => sum + t.amount, 0);
        }
        return transactions.reduce((sum, t) => sum + t.amount, 0);
      },

      getTotalExpense: (currency) => {
        const transactions = get().transactions.filter(
          (t) => t.type === 'expense' && isDateOnOrBeforeToday(t.date),
        );
        if (currency) {
          return transactions
            .filter((t) => t.currency === currency)
            .reduce((sum, t) => sum + t.amount, 0);
        }
        return transactions.reduce((sum, t) => sum + t.amount, 0);
      },

      getBalance: (currency) => {
        return get().getTotalIncome(currency) - get().getTotalExpense(currency);
      },

      getUsedCurrencies: () => {
        const currencies = new Set<Currency>();
        // Only include currencies that have received income (date <= today)
        get().transactions.forEach((t) => {
          if (t.type === 'income' && isDateOnOrBeforeToday(t.date)) {
            currencies.add(t.currency);
          }
        });
        // Sort by priority: EUR, USD, UAH
        const priorityOrder: Currency[] = ['EUR', 'USD', 'UAH'];
        return Array.from(currencies).sort((a, b) => {
          const indexA = priorityOrder.indexOf(a);
          const indexB = priorityOrder.indexOf(b);
          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });
      },
    }),
    {
      name: 'transactions-storage',
      migrate: (persistedState: any, version: number) => {
        // Migrate old transactions without currency field
        if (persistedState?.transactions) {
          persistedState.transactions = persistedState.transactions.map((t: any) => {
            if (!t.currency) {
              return { ...t, currency: 'EUR' };
            }
            // Migrate old category 'food' to 'products'
            if (t.category === 'food') {
              return { ...t, category: 'products' };
            }
            return t;
          });
        }
        return persistedState;
      },
    },
  ),
);

