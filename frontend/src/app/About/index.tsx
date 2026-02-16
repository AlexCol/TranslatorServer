import { aboutStyles } from './about.styles';
import { BsBox } from '@/components/singles/BaseComponents';

function About() {
  return (
    <BsBox className={aboutStyles.pageTC}>
      <BsBox className={aboutStyles.heroTC}>
        <BsBox className={aboutStyles.titleTC}>About Translator Server</BsBox>
        <BsBox className={aboutStyles.subtitleTC}>
          Plataforma para gerenciamento de catalogos de traducao por sistema, ambiente, idioma e namespace, com foco
          em fluxo de localizacao mais consistente entre times de produto e engenharia.
        </BsBox>
      </BsBox>

      <BsBox className={aboutStyles.gridTC}>
        <BsBox className={aboutStyles.cardTC}>
          <BsBox className={aboutStyles.cardTitleTC}>Objetivo</BsBox>
          <BsBox className={aboutStyles.cardTextTC}>
            Centralizar as traducoes da aplicacao em uma estrutura previsivel, com status de cobertura e publicacao
            controlada para ambientes.
          </BsBox>
        </BsBox>

        <BsBox className={aboutStyles.cardTC}>
          <BsBox className={aboutStyles.cardTitleTC}>Como Funciona</BsBox>
          <BsBox className={aboutStyles.cardTextTC}>
            O fluxo principal parte de system e environment, depois language e namespace. Cada namespace contem os
            termos e suas traducoes, com acompanhamento de percentual traduzido.
          </BsBox>
        </BsBox>

        <BsBox className={aboutStyles.cardTC}>
          <BsBox className={aboutStyles.cardTitleTC}>Stack</BsBox>
          <BsBox className={aboutStyles.cardTextTC}>
            Backend em NestJS com providers desacoplados via core-translations, frontend em React com Vite, consumo
            tipado de API via Orval e componentes base reutilizaveis.
          </BsBox>
        </BsBox>
      </BsBox>
    </BsBox>
  );
}

export default About;
