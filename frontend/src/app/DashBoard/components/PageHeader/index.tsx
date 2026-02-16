import { LanguagesIcon } from 'lucide-react';
import pageHeaderStyles from './page-header.styles';
import { BsBox } from '@/components/singles/BaseComponents';
import BsHeading from '@/components/singles/BaseComponents/BsHeading/BsHeading';
import BsText from '@/components/singles/BaseComponents/BsText';

function PageHeader() {
  return (
    <BsBox className={pageHeaderStyles.containerTC}>
      <BsBox className={pageHeaderStyles.iconWrapperTC}>
        <LanguagesIcon size={20} className={pageHeaderStyles.iconTC} />
      </BsBox>
      <BsBox>
        <BsHeading as='h1' className={pageHeaderStyles.headingTC}>
          Translation Overview
        </BsHeading>
        <BsText className={pageHeaderStyles.subtitleTC}>i18n coverage across systems and environments</BsText>
      </BsBox>
    </BsBox>
  );
}
export default PageHeader;
