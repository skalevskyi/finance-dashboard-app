import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  autoTheme: boolean;
  setMode: (mode: ThemeMode) => void;
  setAutoTheme: (enabled: boolean) => void;
  applyTheme: () => void;
  initializeTheme: () => void;
}

const getTimeBasedTheme = (): 'light' | 'dark' => {
  const hour = new Date().getHours();
  // Світла тема з 6:00 до 20:00, темна тема з 20:00 до 6:00
  return hour >= 6 && hour < 20 ? 'light' : 'dark';
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      autoTheme: false,

      setMode: (mode) => {
        // Вимкнути autoTheme при ручному виборі та встановити нову тему
        set({ mode, autoTheme: false });
        // Застосувати тему одразу
        const root = document.documentElement;
        if (mode === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      },

      setAutoTheme: (enabled) => {
        set({ autoTheme: enabled });
        if (enabled) {
          // Якщо увімкнено автоматичну тему, встановити тему на основі часу
          const timeBasedTheme = getTimeBasedTheme();
          set({ mode: timeBasedTheme });
        }
        get().applyTheme();
      },

      applyTheme: () => {
        if (typeof window === 'undefined') return;
        const { mode, autoTheme } = get();
        
        // Якщо увімкнено автоматичну тему, перевірити поточний час
        let effectiveMode = mode;
        if (autoTheme) {
          effectiveMode = getTimeBasedTheme();
          // Оновити mode якщо він змінився
          if (effectiveMode !== mode) {
            set({ mode: effectiveMode });
          }
        }
        
        const root = document.documentElement;
        if (effectiveMode === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      },

      initializeTheme: () => {
        if (typeof window === 'undefined') return;
        
        const { autoTheme } = get();
        
        // Якщо автоматична тема увімкнена, встановити тему на основі часу
        if (autoTheme) {
          const timeBasedTheme = getTimeBasedTheme();
          set({ mode: timeBasedTheme });
        }
        
        get().applyTheme();
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ mode: state.mode, autoTheme: state.autoTheme }),
    },
  ),
);

