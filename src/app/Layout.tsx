import { Outlet } from 'react-router-dom';
import { Header } from '@/components/ui/Header';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <Outlet />
      </main>
      <ScrollToTopButton />
    </div>
  );
};
