import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'uk', label: 'UA', fullName: 'Ukrainian' },
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'fr', label: 'FR', fullName: 'French' },
] as const;

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('settings');

  const currentLang = i18n.language.split('-')[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    // Зберігаємо вибір користувача в localStorage
    localStorage.setItem('i18nextLng', langCode);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {LANGUAGES.map((lang) => {
        const isActive = currentLang === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-4 py-2 text-base font-bold border-2 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500 shadow-md scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            aria-label={`${t('language')}: ${lang.fullName}`}
            aria-pressed={isActive}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

