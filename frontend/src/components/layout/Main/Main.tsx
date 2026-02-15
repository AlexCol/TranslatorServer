import React from 'react';
import { BsBox } from '@/components/singles/BaseComponents';

function Main({ children }: { children: React.ReactNode }) {
  return (
    <BsBox as={'main'} className={mainTailwindClass}>
      {children}
    </BsBox>
  );
}

export default Main;

const mainTailwindClass = `
  h-full
  flex-1
  overflow-y-auto
`;
