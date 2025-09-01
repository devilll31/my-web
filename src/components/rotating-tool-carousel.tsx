
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tool } from '@/lib/tools-data';
import ToolCard from './tool-card';
import { AnimatePresence, motion } from 'framer-motion';

interface RotatingToolCarouselProps {
  tools: Tool[];
  itemsPerPage?: number;
  interval?: number;
  itemsToUpdate?: number;
  tag?: string;
  showRank?: boolean;
}

const RotatingToolCarousel: React.FC<RotatingToolCarouselProps> = ({
  tools,
  itemsPerPage = 10,
  interval = 15000,
  itemsToUpdate = 4,
  tag,
  showRank = false,
}) => {
  const [displayedTools, setDisplayedTools] = useState<Tool[]>([]);

  const shuffleArray = (array: Tool[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const getNextBatch = useCallback((currentTools: Tool[], allTools: Tool[], count: number): Tool[] => {
    const currentSlugs = new Set(currentTools.map(t => t.slug));
    const remainingTools = allTools.filter(tool => !currentSlugs.has(tool.slug));
    const shuffledRemaining = shuffleArray(remainingTools);
    return shuffledRemaining.slice(0, count);
  }, []);

  useEffect(() => {
    const shuffledTools = shuffleArray([...tools]);
    setDisplayedTools(shuffledTools.slice(0, itemsPerPage));
  }, [tools, itemsPerPage]);

  useEffect(() => {
    if (tools.length <= itemsPerPage) {
      setDisplayedTools(tools);
      return;
    }

    const timer = setInterval(() => {
      setDisplayedTools(prevTools => {
        const indicesToReplace = new Set<number>();
        while(indicesToReplace.size < itemsToUpdate) {
            indicesToReplace.add(Math.floor(Math.random() * prevTools.length));
        }

        const newBatch = getNextBatch(prevTools, tools, itemsToUpdate);
        
        let newTools = [...prevTools];
        const batchIndices = Array.from(indicesToReplace);

        for (let i = 0; i < itemsToUpdate; i++) {
          const toolIndex = batchIndices[i];
          if (newBatch[i]) {
            newTools[toolIndex] = newBatch[i];
          }
        }
        
        return newTools;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [tools, itemsPerPage, interval, itemsToUpdate, getNextBatch]);

  if (!displayedTools.length) {
    return null; 
  }
  
  const gridColsClass = itemsPerPage === 20 || itemsPerPage === 50 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';

  return (
    <div className={`grid ${gridColsClass} gap-6`}>
      <AnimatePresence>
        {displayedTools.map((tool, index) => (
          <motion.div
            key={`${tool.slug}-${index}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <ToolCard 
              tool={tool} 
              tag={tag}
              rank={showRank ? index + 1 : undefined} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RotatingToolCarousel;
