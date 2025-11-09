import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactionsStore } from '@/store/useTransactionsStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { Filters } from '../components/Filters';
import type { Transaction, TransactionFilters } from '../types';

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

export const TransactionsPage = () => {
  const { t } = useTranslation('transactions');
  const { transactions, addTransaction, updateTransaction, deleteTransaction, getFilteredTransactions } =
    useTransactionsStore();

  const defaultDates = getCurrentMonthDates();
  const defaultFilters: TransactionFilters = {
    dateFrom: defaultDates.dateFrom,
    dateTo: defaultDates.dateTo,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters);
  const [filteredTransactions, setFilteredTransactions] = useState(
    getFilteredTransactions(defaultFilters),
  );

  useEffect(() => {
    setFilteredTransactions(getFilteredTransactions(defaultFilters));
  }, []);

  const handleAdd = () => {
    setEditingTransaction(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
      setFilteredTransactions(getFilteredTransactions(filters));
      setTransactionToDelete(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTransaction(undefined);
  };

  const handleSubmit = (transactionData: Omit<Transaction, 'id'>, onAnimatedClose: () => void) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }
    onAnimatedClose();
    setTimeout(() => {
      handleModalClose();
      setFilteredTransactions(getFilteredTransactions(filters));
    }, 300);
  };

  const handleCancel = (onAnimatedClose: () => void) => {
    onAnimatedClose();
    setTimeout(() => {
      handleModalClose();
    }, 300);
  };

  const handleFilter = (newFilters: TransactionFilters) => {
    setFilters(newFilters);
    setFilteredTransactions(getFilteredTransactions(newFilters));
  };

  const handleClearFilters = () => {
    const defaultDates = getCurrentMonthDates();
    const clearedFilters: TransactionFilters = {
      dateFrom: defaultDates.dateFrom,
      dateTo: defaultDates.dateTo,
    };
    setFilters(clearedFilters);
    setFilteredTransactions(getFilteredTransactions(clearedFilters));
  };

  return (
    <div className="container-custom py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t('title')}
        </h1>
        <Button variant="primary" onClick={handleAdd} className="w-full sm:w-auto">
          {t('addTransaction')}
        </Button>
      </div>

      <div className="mb-6">
        <Filters onFilter={handleFilter} onClear={handleClearFilters} />
      </div>

      <TransactionList
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingTransaction ? t('editTransaction') : t('addTransaction')}
      >
        {(onAnimatedClose) => (
          <TransactionForm
            transaction={editingTransaction}
            onSubmit={(data) => handleSubmit(data, onAnimatedClose)}
            onCancel={() => handleCancel(onAnimatedClose)}
          />
        )}
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTransactionToDelete(null);
        }}
        onConfirm={confirmDelete}
        title={t('deleteTransaction')}
        message={t('deleteConfirm')}
        confirmText={t('delete', { ns: 'common' })}
        cancelText={t('cancel', { ns: 'common' })}
        variant="danger"
      />
    </div>
  );
};

