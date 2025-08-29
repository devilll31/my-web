
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SloganProps {
  text: string;
  className?: string;
}

const Slogan: React.FC<SloganProps> = ({ text, className }) => {
  return (
    <p className={cn('mx-auto max-w-[700px] text-muted-foreground md:text-xl glowing-slogan', className)}>
      {text}
    </p>
  );
};

export default Slogan;
