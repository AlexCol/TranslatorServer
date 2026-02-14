'use client';

import FuzzyText from '@/components/_reactbits/FuzzyText';
import { TSBox, TSLink } from '@/components/primitives';

export default function NotFound() {
  return (
    //pagina de layout não se aplica ao arquivo de NotFound
    <TSBox className={styles.notFound}>
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true} fontWeight='bold'>
        404
      </FuzzyText>

      <TSBox className='py-4'></TSBox>

      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true} fontSize={40} fontWeight='bold'>
        Página não encontrada!
      </FuzzyText>

      <TSBox className='py-4'></TSBox>

      <TSLink to='/' variant={'destructive'}>
        Voltar para home
      </TSLink>
    </TSBox>
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

const titleTailwindClass = `
  text-6xl font-bold mb-4
`;
const subtitleTailwindClass = `
  text-2xl mb-8
`;

const linkTailwindClass = `
  text-primary
  transition-colors duration-300
  underline
`;

const styles = {
  notFound: notFoundTailwindClass,
  title: titleTailwindClass,
  subtitle: subtitleTailwindClass,
  link: linkTailwindClass,
};
