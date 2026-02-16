import type { ProgressBarProps } from './types/ProgressBarProps';

export function useProgressBar(props: ProgressBarProps) {
  const { percentage, size = 'md', showLabel = false } = props;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  function getColor(percentage: number): string {
    if (percentage >= 100) return 'bg-primary';
    if (percentage >= 51) return 'bg-chart-3';
    if (percentage >= 1) return 'bg-secondary';
    return 'bg-destructive';
  }

  function getGlow(percentage: number): string {
    if (percentage >= 100) return 'shadow-primary/20';
    if (percentage >= 51) return 'shadow-chart-3/20';
    if (percentage >= 1) return 'shadow-secondary/20';
    return 'shadow-destructive/20';
  }
  const sizeMap = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  };

  return {
    sizeMap: sizeMap[size],
    color: getColor(clampedPercentage),
    glow: getGlow(clampedPercentage),
    clampedPercentage,
    showLabel,
  };
}
