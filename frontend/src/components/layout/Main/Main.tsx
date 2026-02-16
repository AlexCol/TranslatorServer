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
  flex-1
  min-h-0
  overflow-y-auto
`;
