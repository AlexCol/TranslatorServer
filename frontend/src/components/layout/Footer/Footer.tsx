import { TSText } from '@/components/primitives';
import { BsBox } from '@/components/singles/BaseComponents';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <BsBox as='footer' className={footerTailwindClass}>
      <TSText className='text-sm'>{`© ${currentYear} Translator Server.`}</TSText>
    </BsBox>
  );
}

export default Footer;

const footerTailwindClass = `
  h-14
  flex
  items-center
  justify-center
  bg-background
  border-t
  border-border
  mt-auto
  transition-colors duration-300
`;
