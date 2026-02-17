import traducoesStyles from '../../traducoes.styles';
import { BsBox } from '@/components/singles/BaseComponents';

type InfoBadgeProps = {
  children: string | undefined;
};

export function InfoBadge({ children }: InfoBadgeProps) {
  return <BsBox className={traducoesStyles.badgeTC}>{children}</BsBox>;
}
