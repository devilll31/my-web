
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
  const [displayedText, setDisplayedText] = useState(isLooping ? '' : text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let ticker: NodeJS.Timeout;
    const handleTyping = () => {
      const i = loopNum % text.length;
      const fullText = text;
      
      setDisplayedText(
        isDeleting
          ? fullText.substring(0, displayedText.length - 1)
          : fullText.substring(0, displayedText.length + 1)
      );

      if (!isDeleting && displayedText === fullText) {
        if(isLooping) {
          ticker = setTimeout(() => setIsDeleting(true), delay);
        }
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        ticker = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    if(isLooping){
      ticker = setTimeout(handleTyping, typingSpeed);
    }

    return () => clearTimeout(ticker);
  }, [displayedText, isDeleting, text, typingSpeed, deletingSpeed, delay, isLooping, loopNum]);

  return (
    <span className={cn(className, 'relative')}>
      {isLooping ? displayedText : text}
      <span className="inline-block w-0.5 h-full animate-pulse bg-foreground/70" style={{height: '1em', verticalAlign: 'text-bottom'}}></span>
    </span>
  );
};

export default TypingAnimation;
