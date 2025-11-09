import { useTranslation } from 'react-i18next';

const LANGUAGES = ['uk', 'en', 'fr'] as const;
type Language = (typeof LANGUAGES)[number];

const getLanguageCode = (lang: string): string => {
  const langCode = lang.split('-')[0];
  switch (langCode) {
    case 'uk':
      return 'UA';
    case 'en':
      return 'EN';
    case 'fr':
      return 'FR';
    default:
      return 'EN';
  }
};

const getNextLanguage = (currentLang: string): Language => {
  const currentIndex = LANGUAGES.findIndex((lang) => currentLang.startsWith(lang));
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % LANGUAGES.length;
  return LANGUAGES[nextIndex];
};

export const LanguageSwitcherCompact = () => {
  const { i18n, t } = useTranslation('settings');

  const handleLanguageToggle = () => {
    const nextLang = getNextLanguage(i18n.language);
    i18n.changeLanguage(nextLang);
    // Зберігаємо вибір користувача в localStorage
    localStorage.setItem('i18nextLng', nextLang);
  };

  const currentLangCode = getLanguageCode(i18n.language);

  return (
    <button
      onClick={handleLanguageToggle}
      className="px-3 py-1.5 text-sm font-bold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      aria-label={t('language')}
    >
      {currentLangCode}
    </button>
  );
};

