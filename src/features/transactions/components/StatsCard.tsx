import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'green' | 'red' | 'blue';
  compact?: boolean; // If true, reduces size by 30%
}

export const StatsCard = ({ title, value, icon, trend, color, compact = false }: StatsCardProps) => {
  const backgroundColorClasses = {
    green: 'bg-green-50 dark:bg-green-900/20',
    red: 'bg-red-50 dark:bg-red-900/20',
    blue: 'bg-blue-50 dark:bg-blue-900/20',
  };

  const backgroundColor = color ? backgroundColorClasses[color] : 'bg-white dark:bg-gray-800';

  // Compact mode: reduce height by 49% total (70% × 70%) while keeping width the same
  // All sizes are proportionally reduced without using scaleY to avoid text flattening
  const paddingXClass = 'px-6'; // Same horizontal padding for all
  const paddingYClass = compact ? 'py-3' : 'py-6'; // py-6 (1.5rem) × 0.49 ≈ 0.735rem, using py-3 (0.75rem)
  const titleSizeClass = compact ? 'text-[0.5rem]' : 'text-sm'; // text-sm (0.875rem) × 0.49 ≈ 0.43rem, using 0.5rem for readability
  const valueSizeClass = compact ? 'text-base' : 'text-2xl'; // text-2xl (1.5rem) × 0.49 ≈ 0.735rem, using text-base (1rem)
  const trendSizeClass = compact ? 'text-[0.5rem]' : 'text-sm';
  const marginTopClass = compact ? 'mt-1' : 'mt-2'; // mt-2 (0.5rem) × 0.49 ≈ 0.245rem, using mt-1 (0.25rem)
  const marginTrendClass = compact ? 'mt-0.5' : 'mt-1'; // mt-1 (0.25rem) × 0.49 ≈ 0.123rem, using mt-0.5 (0.125rem)

  return (
    <div
      className={`${backgroundColor} rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${paddingXClass} ${paddingYClass} transition-all duration-200 hover:shadow-lg cursor-default`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`${titleSizeClass} font-medium text-gray-600 dark:text-gray-400`}>{title}</p>
          <p className={`${marginTopClass} ${valueSizeClass} font-semibold text-gray-900 dark:text-gray-100`}>
            {value}
          </p>
          {trend && (
            <p
              className={`${marginTrendClass} ${trendSizeClass} ${
                trend.isPositive
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </p>
          )}
        </div>
        {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
      </div>
    </div>
  );
};

