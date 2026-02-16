import { motion } from 'framer-motion';
import progressBarStyles from './progress-bar.styles.js';
import type { ProgressBarProps } from './types/ProgressBarProps.js';
import { useProgressBar } from './useProgressBar.js';
import { BsBox } from '@/components/singles/BaseComponents';
import { cn } from '@/lib/utils';

export function ProgressBar(props: ProgressBarProps) {
  const { sizeMap, color, glow, showLabel, clampedPercentage } = useProgressBar(props);
  return (
    <BsBox className={progressBarStyles.containerTC}>
      <BsBox className={cn(progressBarStyles.baseSizeTC, sizeMap)}>
        <motion.div
          className={cn(progressBarStyles.basePercentageTC, color, glow)}
          initial={{
            width: 0,
          }}
          animate={{
            width: `${clampedPercentage}%`,
          }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </BsBox>
      {showLabel && (
        <BsBox as='span' className={progressBarStyles.labelTC}>
          {clampedPercentage}%
        </BsBox>
      )}
    </BsBox>
  );
}
