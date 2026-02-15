'use client';

import FuzzyText from '@/components/_reactbits/FuzzyText';
import { TSLink } from '@/components/primitives';
import { BsBox } from '@/components/singles/BaseComponents';

export default function NotFound() {
  return (
    //pagina de layout não se aplica ao arquivo de NotFound
    <BsBox className={styles.notFound}>
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true} fontWeight='bold'>
        404
      </FuzzyText>

      <BsBox className='py-4'></BsBox>

      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true} fontSize={40} fontWeight='bold'>
        Página não encontrada!
      </FuzzyText>

      <BsBox className='py-4'></BsBox>

      <TSLink to='/' variant={'destructive'}>
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
