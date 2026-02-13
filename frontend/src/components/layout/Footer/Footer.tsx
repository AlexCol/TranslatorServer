import { TSBox, TSText } from '@/components/primitives';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <TSBox as={'footer'} className={footerTailwindClass}>
      <TSText className='text-sm'>© {currentYear} Sistema de Chamados.</TSText>
    </TSBox>
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
