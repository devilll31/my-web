'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delay = 2000;

  useEffect(() => {
    let ticker: NodeJS.Timeout;
    
    const handleTyping = () => {
      const fullText = text;
      setDisplayedText(
        isDeleting
          ? fullText.substring(0, displayedText.length - 1)
          : fullText.substring(0, displayedText.length + 1)
      );

      if (!isDeleting && displayedText === fullText) {
        ticker = setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    ticker = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(ticker);
  }, [displayedText, isDeleting, text, loopNum]);

  return (
    <h1 className={cn(className, 'relative')}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default TypingAnimation;
