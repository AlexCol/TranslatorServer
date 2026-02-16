import { useParams } from 'react-router-dom';
import { BsBox } from '@/components/singles/BaseComponents';

function Traducoes() {
  const { system, environment, language, namespace } = useParams();

  return (
    <BsBox className='space-y-2'>
      <BsBox>Traduções</BsBox>
      <BsBox>system: {system}</BsBox>
      <BsBox>environment: {environment}</BsBox>
      <BsBox>language: {language}</BsBox>
      <BsBox>namespace: {namespace}</BsBox>
    </BsBox>
  );
}

export default Traducoes;
