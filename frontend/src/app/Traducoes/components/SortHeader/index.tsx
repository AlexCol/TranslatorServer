import { ArrowUpDownIcon } from 'lucide-react';
import traducoesStyles from '../../traducoes.styles';
import { BsButton } from '@/components/singles/BaseComponents';

type SortHeaderProps = {
  label: string;
  active: boolean;
  direction: 'asc' | 'desc';
  onClick: () => void;
};

export function SortHeader({ label, active, direction, onClick }: SortHeaderProps) {
  return (
    <BsButton
      type='button'
      variants={{ variant: 'ghost' }}
      onClick={onClick}
      className={active ? traducoesStyles.sortButtonActiveTC : traducoesStyles.sortButtonTC}
    >
      {label}
      <ArrowUpDownIcon size={12} className={active && direction === 'desc' ? 'rotate-180' : ''} />
    </BsButton>
  );
}
