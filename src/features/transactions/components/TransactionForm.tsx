import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Transaction } from '../types';

interface TransactionFormProps {
  transaction?: Transaction;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

const getInitialFormData = () => ({
  type: 'expense' as 'income' | 'expense',
  amount: '',
  currency: 'EUR' as 'USD' | 'EUR' | 'UAH',
  category: '',
  date: new Date().toISOString().split('T')[0],
  note: '',
});

export const TransactionForm = ({ transaction, onSubmit, onCancel }: TransactionFormProps) => {
  const { t } = useTranslation('transactions');
  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        currency: transaction.currency,
        category: transaction.category,
        date: transaction.date.split('T')[0],
        note: transaction.note || '',
      });
    } else {
      setFormData(getInitialFormData());
      setErrors({});
    }
  }, [transaction]);

  const categories = [
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

  const currencyOptions = [
    { value: 'EUR', label: '€ EUR' },
    { value: 'USD', label: '$ USD' },
    { value: 'UAH', label: '₴ UAH' },
  ];

  const typeOptions = [
    { value: 'income', label: t('income') },
    { value: 'expense', label: t('expense') },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = t('required');
    }

    if (!formData.category) {
      newErrors.category = t('required');
    }

    if (!formData.date) {
      newErrors.date = t('required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        type: formData.type,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.category,
        date: new Date(formData.date).toISOString(),
        note: formData.note || undefined,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
      <Select
        label={t('type')}
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
        options={typeOptions}
        required
        error={errors.type}
      />

      <Input
        label={t('amount')}
        type="number"
        step="0.01"
        min="0"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
        error={errors.amount}
      />

      <Select
        label={t('currency')}
        value={formData.currency}
        onChange={(e) => setFormData({ ...formData, currency: e.target.value as 'USD' | 'EUR' | 'UAH' })}
        options={currencyOptions}
        required
        error={errors.currency}
      />

      <Select
        label={t('category')}
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        options={[
          { value: '', label: t('selectCategory'), disabled: true } as { value: string; label: string; disabled?: boolean },
          ...categories,
        ]}
        required
        error={errors.category}
      />

      <Input
        label={t('date')}
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
        error={errors.date}
      />

      <Input
        label={t('note')}
        type="text"
        value={formData.note}
        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        placeholder={t('optional')}
      />

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6">
        <Button type="button" variant="secondary" onClick={onCancel} className="w-full sm:w-auto">
          {t('cancel', { ns: 'common' })}
        </Button>
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          {t('save', { ns: 'common' })}
        </Button>
      </div>
    </form>
  );
};

