import { useThemeStore } from '@/store/useThemeStore';

export const ThemeToggle = () => {
  const { mode, setMode } = useThemeStore();

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={mode === 'light' ? 'Перемкнути на темну тему' : 'Перемкнути на світлу тему'}
      type="button"
    >
      <div className="relative w-6 h-6">
        {/* Сонце (для світлої теми) */}
        <svg
          className={`absolute inset-0 w-6 h-6 text-gray-600 dark:text-gray-400 transition-all duration-500 ${
            mode === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        {/* Зірка (для темної теми) */}
        <svg
          className={`absolute inset-0 w-6 h-6 text-gray-600 dark:text-gray-400 transition-all duration-500 ${
            mode === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2-6-4.8h7.6z" />
        </svg>
      </div>
    </button>
  );
};

