
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
  isLooping?: boolean;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 2500,
  isLooping = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (hasCompleted && !isLooping) return;

    let ticker: NodeJS.Timeout;
    
    const handleTyping = () => {
      const fullText = text;
      setDisplayedText(
        isDeleting
          ? fullText.substring(0, displayedText.length - 1)
          : fullText.substring(0, displayedText.length + 1)
      );

      if (!isDeleting && displayedText === fullText) {
        if (isLooping) {
            ticker = setTimeout(() => setIsDeleting(true), delay);
        } else {
            setHasCompleted(true);
        }
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
      } else {
        ticker = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    ticker = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(ticker);
  }, [displayedText, isDeleting, text, typingSpeed, deletingSpeed, delay, isLooping, hasCompleted]);

  return (
    <h1 className={cn(className, 'relative')}>
      {displayedText}
      <span className="inline-block w-0.5 h-full animate-pulse bg-foreground/70" style={{height: '1em', verticalAlign: 'text-bottom'}}></span>
    </h1>
  );
};

export default TypingAnimation;

    