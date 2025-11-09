import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTransactionsStore } from '@/store/useTransactionsStore';
import { TransactionForm } from '../components/TransactionForm';
import type { Transaction } from '../types';

export const AddEditTransactionPage = () => {
  const { t } = useTranslation('transactions');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { transactions, addTransaction, updateTransaction } = useTransactionsStore();

  const transaction = id ? transactions.find((t) => t.id === id) : undefined;

  useEffect(() => {
    if (id && !transaction) {
      navigate('/transactions');
    }
  }, [id, transaction, navigate]);

  const handleSubmit = (transactionData: Omit<Transaction, 'id'>) => {
    if (transaction) {
      updateTransaction(transaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }
    navigate('/transactions');
  };

  const handleCancel = () => {
    navigate('/transactions');
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {transaction ? t('editTransaction') : t('addTransaction')}
      </h1>
      <div className="max-w-2xl">
        <TransactionForm
          transaction={transaction}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

