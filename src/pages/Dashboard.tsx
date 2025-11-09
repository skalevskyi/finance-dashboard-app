import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTransactionsStore } from '@/store/useTransactionsStore';
import { formatCurrency } from '@/utils/number';
import { Button } from '@/components/ui/Button';
import { StatsCard } from '@/features/transactions/components/StatsCard';
import { Chart } from '@/features/transactions/components/Chart';
import { formatDate } from '@/utils/date';

export const Dashboard = () => {
  const { t, i18n } = useTranslation('dashboard');
  const { t: tTransactions } = useTranslation('transactions');
  const {
    transactions,
    getTotalIncome,
    getTotalExpense,
    getBalance,
    getFilteredTransactions,
    getUsedCurrencies,
  } = useTransactionsStore();

  const recentTransactions = getFilteredTransactions({})
    .slice(0, 5)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const usedCurrencies = getUsedCurrencies();

  const formatMoney = (amount: number, currency: string) => {
    return formatCurrency(amount, i18n.language === 'uk' ? 'uk-UA' : 'en-US', currency as any);
  };

  return (
    <div className="container-custom py-4 sm:py-6 lg:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 lg:mb-8">
        {t('title')}
      </h1>

      {usedCurrencies.length > 0 && (
        <div className="mb-8">
          {usedCurrencies.map((currency, index) => {
            const balance = getBalance(currency);
            const income = getTotalIncome(currency);
            const expense = getTotalExpense(currency);
            const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '₴';
            const isCompact = currency !== 'EUR'; // Compact mode for non-EUR currencies
            // For additional currencies, use equal top and bottom margins (same as space-y-6 = 1.5rem)
            const marginTopClass = isCompact ? 'mt-6' : index === 0 ? '' : 'mt-6';
            const marginBottomClass = isCompact ? 'mb-6' : 'mb-6';
            return (
              <div key={currency} className={`${marginTopClass} ${marginBottomClass} space-y-2`}>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                  {currencySymbol} {currency}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <StatsCard
                    title={t('totalBalance')}
                    value={formatMoney(balance, currency)}
                    color="blue"
                    compact={isCompact}
                    trend={
                      balance > 0 && income > 0
                        ? { value: Math.round(((income - expense) / income) * 100), isPositive: true }
                        : undefined
                    }
                  />
                  <StatsCard
                    title={t('totalIncome')}
                    value={formatMoney(income, currency)}
                    color="green"
                    compact={isCompact}
                  />
                  <StatsCard
                    title={t('totalExpense')}
                    value={formatMoney(expense, currency)}
                    color="red"
                    compact={isCompact}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {usedCurrencies.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatsCard title={t('totalBalance')} value={formatMoney(0, 'USD')} />
          <StatsCard title={t('totalIncome')} value={formatMoney(0, 'USD')} />
          <StatsCard title={t('totalExpense')} value={formatMoney(0, 'USD')} />
        </div>
      )}

      <div className="mb-6 sm:mb-8">
        <Chart transactions={transactions} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t('recentTransactions')}
          </h2>
          <Link to="/transactions">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        {recentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t('noTransactions')}</p>
            <Link to="/transactions/new">
              <Button variant="primary">{t('addFirstTransaction')}</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Date
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Type
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden sm:table-cell">
                      Category
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {transaction.type === 'income' ? tTransactions('income') : tTransactions('expense')}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100 hidden sm:table-cell">
                        {tTransactions(`categories.${transaction.category}`)}
                      </td>
                      <td
                        className={`px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold ${
                          transaction.type === 'income'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatMoney(transaction.amount, transaction.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

