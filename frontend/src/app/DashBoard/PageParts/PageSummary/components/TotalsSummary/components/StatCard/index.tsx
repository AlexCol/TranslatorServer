import { motion } from 'framer-motion';
import statCardStyles from './stat-card.styles';
import { BsBox, BsText } from '@/components/singles/BaseComponents';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  index: number;
};

function StatCard({ icon, label, value, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={statCardStyles.motionDivTC}
    >
      <BsBox className={statCardStyles.containerTC}>
        <BsBox as='span' className={statCardStyles.iconTC}>
          {icon}
        </BsBox>
        <BsBox as='span' className={statCardStyles.labelTC}>
          {label}
        </BsBox>
      </BsBox>
      <BsText as='p' className={statCardStyles.valueTC}>
        {value}
      </BsText>
    </motion.div>
  );
}
export default StatCard;
