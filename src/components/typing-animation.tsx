'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 2500,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

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
        // Pause at the end of typing
        ticker = setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && displayedText === '') {
        // Finish deleting, loop to next
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        // Continue typing or deleting
        ticker = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    ticker = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(ticker);
  }, [displayedText, isDeleting, text, loopNum, typingSpeed, deletingSpeed, delay]);

  return (
    <span className={cn(className, 'relative')}>
      {displayedText}
      <span className="inline-block w-0.5 h-full animate-pulse bg-foreground/70" style={{height: '1em', verticalAlign: 'text-bottom'}}></span>
    </span>
  );
};

export default TypingAnimation;
