import React from 'react';
import { TSBox } from '@/components/primitives';

function Main({ children }: { children: React.ReactNode }) {
  return (
    <TSBox as={'main'} className={mainTailwindClass}>
      {children}
    </TSBox>
  );
}

export default Main;

const mainTailwindClass = `
  h-full
  flex-1
  overflow-y-auto
`;
