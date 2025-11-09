import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils/date';
import { formatCurrency } from '@/utils/number';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionList = ({ transactions, onEdit, onDelete }: TransactionListProps) => {
  const { t, i18n } = useTranslation('transactions');

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-gray-600 dark:text-gray-400">{t('noTransactions')}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{t('noTransactionsDesc')}</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {transaction.type === 'income' ? t('income') : t('expense')}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {t(`categories.${transaction.category}`)}
                </h3>
                {transaction.note && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{transaction.note}</p>
                )}
              </div>
              <div
                className={`text-right font-semibold text-base ${
                  transaction.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(
                  transaction.amount,
                  i18n.language === 'uk' ? 'uk-UA' : 'en-US',
                  transaction.currency,
                )}
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(transaction)}
                aria-label={t('editTransaction')}
                className="flex-1"
              >
                {t('edit', { ns: 'common' })}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(transaction.id)}
                aria-label={t('deleteTransaction')}
                className="flex-1"
              >
                {t('delete', { ns: 'common' })}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <Table>
            <TableHead>
              <TableHeader>{t('date')}</TableHeader>
              <TableHeader>{t('type')}</TableHeader>
              <TableHeader>{t('category')}</TableHeader>
              <TableHeader>{t('amount')}</TableHeader>
              <TableHeader className="hidden lg:table-cell">{t('note')}</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {transaction.type === 'income' ? t('income') : t('expense')}
                    </span>
                  </TableCell>
                  <TableCell>{t(`categories.${transaction.category}`)}</TableCell>
                  <TableCell
                    className={`font-semibold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(
                      transaction.amount,
                      i18n.language === 'uk' ? 'uk-UA' : 'en-US',
                      transaction.currency,
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs truncate hidden lg:table-cell">
                    {transaction.note || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(transaction)}
                        aria-label={t('editTransaction')}
                      >
                        {t('edit', { ns: 'common' })}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(transaction.id)}
                        aria-label={t('deleteTransaction')}
                      >
                        {t('delete', { ns: 'common' })}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

