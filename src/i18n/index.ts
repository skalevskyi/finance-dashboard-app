import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './en/common.json';
import enDashboard from './en/dashboard.json';
import enTransactions from './en/transactions.json';
import enSettings from './en/settings.json';

import uaCommon from './ua/common.json';
import uaDashboard from './ua/dashboard.json';
import uaTransactions from './ua/transactions.json';
import uaSettings from './ua/settings.json';

import frCommon from './fr/common.json';
import frDashboard from './fr/dashboard.json';
import frTransactions from './fr/transactions.json';
import frSettings from './fr/settings.json';

/**
 * Визначає мову з браузера згідно з правилами:
 * - Українська ("uk") або Російська ("ru") → "uk"
 * - Французька ("fr") → "fr"
 * - Інші → "en"
 * Використовує navigator.languages (масив) для більш точного визначення
 */
function resolveBrowserLang(): 'uk' | 'fr' | 'en' {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const list =
    Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language];

  const norm = list
    .filter(Boolean)
    .map((l) => l.toLowerCase().split('-')[0]);

  if (norm.includes('uk') || norm.includes('ru')) return 'uk';
  if (norm.includes('fr')) return 'fr';
  return 'en';
}

// Перевіряємо, чи користувач раніше вибрав мову вручну
const stored = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
const initialLang = stored
  ? (stored.split('-')[0] as 'uk' | 'fr' | 'en')
  : resolveBrowserLang();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        dashboard: enDashboard,
        transactions: enTransactions,
        settings: enSettings,
      },
      uk: {
        // Використовуємо ресурси з папки ua, але код мови "uk"
        common: uaCommon,
        dashboard: uaDashboard,
        transactions: uaTransactions,
        settings: uaSettings,
      },
      fr: {
        common: frCommon,
        dashboard: frDashboard,
        transactions: frTransactions,
        settings: frSettings,
      },
    },
    supportedLngs: ['uk', 'fr', 'en'],
    fallbackLng: 'en',
    lng: initialLang,
    load: 'languageOnly',
    defaultNS: 'common',
    detection: {
      // Спочатку перевіряємо localStorage (якщо користувач вже вибрав мову),
      // потім navigator (для автоматичного визначення при першому запуску)
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      // Зберігаємо мову в localStorage тільки після ручного вибору користувачем
      // Не зберігаємо автоматично виявлену мову на першому завантаженні
      // caches: [] - не зберігаємо автоматично, тільки при ручному виборі
      caches: [],
      // Перетворюємо виявлену мову: ru → uk
      convertDetectedLanguage: (detectedLang: string): string => {
        const langCode = detectedLang.toLowerCase().split('-')[0];
        if (langCode === 'uk' || langCode === 'ru') return 'uk';
        if (langCode === 'fr') return 'fr';
        return 'en';
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

