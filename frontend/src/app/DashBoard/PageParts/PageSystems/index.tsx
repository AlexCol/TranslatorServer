import type { SystemData } from '../../types';
import { SystemCard } from './components/SystemCard';
import pageSystemsStyles from './page-systems.styles';
import { BsBox } from '@/components/singles/BaseComponents';
import BsHeading from '@/components/singles/BaseComponents/BsHeading/BsHeading';

type PageSystemsProps = {
  systems: SystemData[];
};

function PageSystems({ systems }: PageSystemsProps) {
  return (
    <BsBox as='section' aria-label='Systems breakdown'>
      <BsHeading as='h2' className={pageSystemsStyles.headingTC}>
        Systems
      </BsHeading>
      <BsBox className={pageSystemsStyles.listTC}>
        {systems.map((system, i) => (
          <SystemCard key={system.system} system={system} index={i} />
        ))}
      </BsBox>
    </BsBox>
  );
}

export default PageSystems;
