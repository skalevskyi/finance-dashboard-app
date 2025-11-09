import { convertToEUR } from '@/utils/currency';
import { isDateOnOrBeforeToday } from '@/utils/date';
import { formatCurrency } from '@/utils/number';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CartesianGrid, Dot, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Currency, Transaction } from '../types';

interface FutureTransaction {
  category: string;
  amount: number;
  currency: Currency;
  type: 'income' | 'expense';
}

interface ChartProps {
  transactions: Transaction[];
}

export const Chart = ({ transactions }: ChartProps) => {
  const { t, i18n } = useTranslation(['dashboard', 'transactions']);

  // Base currency for chart display is always EUR
  const baseCurrency: Currency = 'EUR';

  const { dailyData, currentStats } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const currentDay = now.getDate();

    const dataMap = new Map<number, { income: number; expense: number }>();
    const futureTransactionsMap = new Map<number, FutureTransaction[]>();
    let currentDayIncome = 0;
    let currentDayExpense = 0;

    // Initialize all days
    for (let day = 1; day <= daysInMonth; day++) {
      dataMap.set(day, { income: 0, expense: 0 });
      futureTransactionsMap.set(day, []);
    }

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const transactionMonth = date.getMonth();
      const transactionYear = date.getFullYear();
      const day = date.getDate();
      const isPastOrToday = isDateOnOrBeforeToday(transaction.date);

      // Process all transactions from current month, converting to EUR
      if (transactionMonth === currentMonth && transactionYear === currentYear) {
        // Convert amount to EUR for chart display
        const amountInEUR = convertToEUR(transaction.amount, transaction.currency);

        if (isPastOrToday) {
          // Transaction has occurred or is today - count in balance
          const data = dataMap.get(day)!;
          if (transaction.type === 'income') {
            data.income += amountInEUR;
          } else {
            data.expense += amountInEUR;
          }

          // Calculate current day stats
          if (day === currentDay) {
            if (transaction.type === 'income') {
              currentDayIncome += amountInEUR;
            } else {
              currentDayExpense += amountInEUR;
            }
          }
        } else {
          // Future transaction - store for tooltip display
          const futureTransactions = futureTransactionsMap.get(day)!;
          futureTransactions.push({
            category: transaction.category,
            amount: transaction.amount,
            currency: transaction.currency,
            type: transaction.type,
          });
        }
      }
    });

    // Convert to array and calculate cumulative balance
    // Only accumulate balance up to current day
    let runningBalance = 0;
    const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const data = dataMap.get(day)!;
      const futureTransactions = futureTransactionsMap.get(day)!;

      // Only accumulate balance up to current day
      if (day <= currentDay) {
        runningBalance += data.income - data.expense;
      }

      // Calculate totals for future transactions (for display)
      const futureIncome = futureTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + convertToEUR(t.amount, t.currency), 0);
      const futureExpense = futureTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + convertToEUR(t.amount, t.currency), 0);

      return {
        day: day.toString(),
        income: day <= currentDay ? data.income : null,
        expense: day <= currentDay ? data.expense : null,
        balance: day <= currentDay ? runningBalance : null,
        futureIncome: day > currentDay && futureIncome > 0 ? futureIncome : null,
        futureExpense: day > currentDay && futureExpense > 0 ? futureExpense : null,
        futureTransactions: day > currentDay ? futureTransactions : [],
      };
    });

    const currentDayBalance = currentDayIncome - currentDayExpense;

    return {
      dailyData,
      currentStats: {
        income: currentDayIncome,
        expense: currentDayExpense,
        balance: currentDayBalance,
      },
    };
  }, [transactions]);

  const formatValue = (value: number) => {
    return formatCurrency(value, i18n.language === 'uk' ? 'uk-UA' : 'en-US', baseCurrency);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
        {t('monthlyChart')}
      </h3>

      {/* Current day stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('currentIncome')}</div>
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            {formatValue(currentStats.income)}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('currentExpense')}</div>
          <div className="text-lg font-semibold text-red-600 dark:text-red-400">
            {formatValue(currentStats.expense)}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('currentBalance')}</div>
          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {formatValue(currentStats.balance)}
          </div>
        </div>
      </div>

      {/* Graph container matching stats blocks width - mobile: 1 column, desktop: 3 columns */}
      <div className="w-full">
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <LineChart
            data={dailyData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
            <XAxis
              dataKey="day"
              className="text-gray-600 dark:text-gray-400 text-xs"
              tick={{ fill: 'currentColor', fontSize: 12 }}
              interval="preserveStartEnd"
              padding={{ left: 0, right: 0 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              className="text-gray-600 dark:text-gray-400 text-xs"
              tick={{ fill: 'currentColor', fontSize: 12 }}
              width={50}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickSize={0}
              domain={['auto', 'auto']}
              tickFormatter={(value) => {
                return Math.round(value).toString();
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) {
                  return null;
                }

                const data = payload[0]?.payload;
                const futureTransactions = data?.futureTransactions as FutureTransaction[] | undefined;

                // Check if we're hovering over a future transaction point
                const futureIncomePayload = payload.find((p) => p.dataKey === 'futureIncome');
                const futureExpensePayload = payload.find((p) => p.dataKey === 'futureExpense');

                if (futureIncomePayload || futureExpensePayload) {
                  const type = futureIncomePayload ? 'income' : 'expense';
                  const filtered = futureTransactions?.filter((t) => t.type === type) || [];

                  if (filtered.length > 0) {
                    return (
                      <div
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg"
                        style={{
                          backgroundColor: 'var(--bg-color, white)',
                          border: '1px solid var(--border-color, #e5e7eb)',
                        }}
                      >
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                          {t('day')} {label}
                        </div>
                        <div className="space-y-1">
                          {filtered.map((transaction, index) => (
                            <div
                              key={`future-transaction-${transaction.category}-${transaction.amount}-${index}`}
                              className="text-sm text-gray-900 dark:text-gray-100"
                            >
                              <span className="font-medium">
                                {t(`categories.${transaction.category}`, { ns: 'transactions' })}
                              </span>
                              {' - '}
                              <span>
                                {formatCurrency(
                                  transaction.amount,
                                  i18n.language === 'uk' ? 'uk-UA' : 'en-US',
                                  transaction.currency,
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }

                // Regular tooltip for past/current transactions
                return (
                  <div
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg"
                    style={{
                      backgroundColor: 'var(--bg-color, white)',
                      border: '1px solid var(--border-color, #e5e7eb)',
                    }}
                  >
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      {t('day')} {label}
                    </div>
                    {payload.map((entry, index) => {
                      if (entry.dataKey === 'futureIncome' || entry.dataKey === 'futureExpense') {
                        return null;
                      }
                      const labels: Record<string, string> = {
                        income: t('totalIncome'),
                        expense: t('totalExpense'),
                        balance: t('totalBalance'),
                      };
                      return (
                        <div key={index} className="text-sm text-gray-900 dark:text-gray-100">
                          <span
                            style={{
                              color: entry.color,
                              marginRight: '8px',
                            }}
                          >
                            ●
                          </span>
                          {labels[entry.dataKey as string] || entry.dataKey}: {formatValue(entry.value as number)}
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="income"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="expense"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="balance"
              connectNulls={false}
            />
            {/* Future income points (inactive) */}
            <Line
              type="monotone"
              dataKey="futureIncome"
              stroke="none"
              strokeWidth={0}
              dot={(props) => {
                const { cx, cy, payload, index } = props;
                if (payload?.futureIncome && cx !== undefined && cy !== undefined) {
                  return (
                    <Dot
                      key={`futureIncome-dot-${index}-${payload.day || index}`}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="#10b981"
                      fillOpacity={0.3}
                      stroke="#10b981"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                    />
                  );
                }
                return <g key={`futureIncome-empty-${index}`} />;
              }}
              name="futureIncome"
              connectNulls={false}
              isAnimationActive={false}
            />
            {/* Future expense points (inactive) */}
            <Line
              type="monotone"
              dataKey="futureExpense"
              stroke="none"
              strokeWidth={0}
              dot={(props) => {
                const { cx, cy, payload, index } = props;
                if (payload?.futureExpense && cx !== undefined && cy !== undefined) {
                  return (
                    <Dot
                      key={`futureExpense-dot-${index}-${payload.day || index}`}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="#ef4444"
                      fillOpacity={0.3}
                      stroke="#ef4444"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                    />
                  );
                }
                return <g key={`futureExpense-empty-${index}`} />;
              }}
              name="futureExpense"
              connectNulls={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

