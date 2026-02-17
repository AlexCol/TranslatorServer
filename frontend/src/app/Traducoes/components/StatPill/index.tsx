import traducoesStyles from '../../traducoes.styles';
import { BsBox, BsText } from '@/components/singles/BaseComponents';

type StatPillProps = {
  label: string;
  value: number;
  highlight?: boolean;
};

export function StatPill({ label, value, highlight = false }: StatPillProps) {
  return (
    <BsBox className={highlight ? traducoesStyles.statPillHighlightTC : traducoesStyles.statPillTC}>
      <BsText className={traducoesStyles.statLabelTC}>{label}</BsText>
      <BsText className={traducoesStyles.statValueTC}>{value}</BsText>
    </BsBox>
  );
}
