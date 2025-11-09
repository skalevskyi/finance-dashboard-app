import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

export const NotFound = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container-custom py-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link to="/">
          <Button variant="primary">{t('back')} Home</Button>
        </Link>
      </div>
    </div>
  );
};

