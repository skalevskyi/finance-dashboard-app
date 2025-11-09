import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';
import { useTransactionsStore } from '@/store/useTransactionsStore';
import { useThemeStore } from '@/store/useThemeStore';

export const Settings = () => {
  const { t } = useTranslation('settings');
  const { clearAllTransactions } = useTransactionsStore();
  const { autoTheme, setAutoTheme } = useThemeStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClearAllData = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmClearAllData = () => {
    clearAllTransactions();
    setIsDeleteModalOpen(false);
    setShowToast(true);
  };

  return (
    <div className="container-custom py-4 sm:py-6 lg:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 lg:mb-8">
        {t('title')}
      </h1>

      <div className="max-w-2xl space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            {t('theme')}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <label htmlFor="auto-theme" className="text-sm font-medium text-gray-900 dark:text-gray-100 block">
                  {t('autoTheme')}
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('autoThemeDesc')}</p>
              </div>
              <label
                htmlFor="auto-theme"
                className="relative inline-flex items-center cursor-pointer flex-shrink-0"
              >
                <input
                  id="auto-theme"
                  type="checkbox"
                  checked={autoTheme}
                  onChange={(e) => setAutoTheme(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            {t('language')}
          </h2>
          <LanguageSwitcher />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            {t('data')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('clearAllDataDesc')}</p>
          <Button variant="danger" onClick={handleClearAllData}>
            {t('clearAllData')}
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmClearAllData}
        title={t('clearAllData')}
        message={t('clearAllDataConfirm')}
        confirmText={t('clearAllData')}
        cancelText={t('cancel', { ns: 'common' })}
        variant="danger"
      />

      {showToast && (
        <Toast
          message={t('success', { ns: 'common' })}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

