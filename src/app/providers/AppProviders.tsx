import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  const { initializeTheme, applyTheme, autoTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    // Якщо автоматична тема увімкнена, перевіряти час кожну хвилину
    if (autoTheme) {
      const interval = setInterval(() => {
        applyTheme();
      }, 60000); // Перевіряти кожну хвилину

      return () => {
        clearInterval(interval);
      };
    }
  }, [autoTheme, applyTheme]);

  return <>{children}</>;
};

