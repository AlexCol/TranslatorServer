'use client';

import { useTheme } from 'next-themes';
import FuzzyText, { type FuzzyTextProps } from '@/components/_reactbits/FuzzyText';
import { TSLink } from '@/components/primitives';
import { BsBox } from '@/components/singles/BaseComponents';

export default function NotFound() {
  const { theme } = useTheme();
  const props: FuzzyTextProps = {
    color: theme === 'dark' ? '#fff' : '#000',
    baseIntensity: 0.2,
    hoverIntensity: 0.5,
    enableHover: true,
    fontWeight: 'bold',
    children: undefined,
  };
  return (
    //pagina de layout não se aplica ao arquivo de NotFound
    <BsBox className={styles.notFound}>
      <FuzzyText {...props}>404</FuzzyText>

      <BsBox className='py-4'></BsBox>

      <FuzzyText {...props} fontSize={40}>
        Página não encontrada!
      </FuzzyText>

      <BsBox className='py-4'></BsBox>

      <TSLink to='/' variant={'destructive'} className={styles.link}>
        Voltar para home
      </TSLink>
    </BsBox>
  );
}

//deixado aqui os estilos para a página de NotFound
const notFoundTailwindClass = `
  h-full  
  m-auto
  flex 
  flex-col 
  items-center 
  justify-center
`;

const linkTailwindClass = `
  text-primary
  transition-colors duration-300
`;

const styles = {
  notFound: notFoundTailwindClass,
  link: linkTailwindClass,
};
