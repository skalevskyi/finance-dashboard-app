import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { TransactionFilters } from '../types';

interface FiltersProps {
  onFilter: (filters: TransactionFilters) => void;
  onClear: () => void;
}

const getCurrentMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return {
    dateFrom: formatDateForInput(firstDay),
    dateTo: formatDateForInput(lastDay),
  };
};

export const Filters = ({ onFilter, onClear }: FiltersProps) => {
  const { t } = useTranslation('transactions');
  const defaultDates = getCurrentMonthDates();
  const [filters, setFilters] = useState<TransactionFilters>({
    dateFrom: defaultDates.dateFrom,
    dateTo: defaultDates.dateTo,
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      onFilter(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = [
    { value: '', label: t('allCategories') },
    { value: 'transport', label: t('categories.transport') },
    { value: 'shopping', label: t('categories.shopping') },
    { value: 'bills', label: t('categories.bills') },
    { value: 'entertainment', label: t('categories.entertainment') },
    { value: 'health', label: t('categories.health') },
    { value: 'education', label: t('categories.education') },
    { value: 'salary', label: t('categories.salary') },
    { value: 'cash', label: t('categories.cash') },
    { value: 'credit', label: t('categories.credit') },
    { value: 'subscriptions', label: t('categories.subscriptions') },
    { value: 'other', label: t('categories.other') },
  ];

  const typeOptions = [
    { value: '', label: t('allTypes') },
    { value: 'income', label: t('income') },
    { value: 'expense', label: t('expense') },
  ];

  const handleApply = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    const defaultDates = getCurrentMonthDates();
    setFilters({
      dateFrom: defaultDates.dateFrom,
      dateTo: defaultDates.dateTo,
    });
    onClear();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
        {t('filters')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Input
          label={t('dateFrom')}
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
        />
        <Input
          label={t('dateTo')}
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
        />
        <Select
          label={t('category')}
          value={filters.category || ''}
          onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
          options={categories}
        />
        <Select
          label={t('type')}
          value={filters.type || ''}
          onChange={(e) => setFilters({ ...filters, type: (e.target.value || undefined) as 'income' | 'expense' | undefined })}
          options={typeOptions}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <Button variant="secondary" onClick={handleClear} className="w-full sm:w-auto">
          {t('clear', { ns: 'common' })}
        </Button>
        <Button variant="primary" onClick={handleApply} className="w-full sm:w-auto">
          {t('apply', { ns: 'common' })}
        </Button>
      </div>
    </div>
  );
};

