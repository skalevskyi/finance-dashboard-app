import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ThemeToggleCompact } from './ThemeToggleCompact';
import { LanguageSwitcherCompact } from './LanguageSwitcherCompact';

export const Header = () => {
  const { t: tCommon } = useTranslation('common');
  const { t: tDashboard } = useTranslation('dashboard');
  const { t: tTransactions } = useTranslation('transactions');
  const { t: tSettings } = useTranslation('settings');
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: tDashboard('title') },
    { path: '/transactions', label: tTransactions('title') },
    { path: '/settings', label: tSettings('title') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Home"
            onClick={closeMobileMenu}
          >
            {tCommon('appName')}
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Controls - visible on all screen sizes */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcherCompact />
              <ThemeToggleCompact />
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu with animation */}
        <div
          className={`md:hidden border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`px-4 py-2 rounded-md text-base font-medium transition-all duration-200 transform ${
                    isMobileMenuOpen
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-4 opacity-0'
                      } ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

