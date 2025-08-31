
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
  const [initialToolMap, setInitialToolMap] = useState<Map<string, number>>(new Map());

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
    const remainingTools = allTools.filter(tool => !currentTools.some(t => t.slug === tool.slug));
    const shuffledRemaining = shuffleArray(remainingTools);
    return shuffledRemaining.slice(0, count);
  }, []);

  useEffect(() => {
    const shuffledTools = shuffleArray([...tools]);
    setDisplayedTools(shuffledTools.slice(0, itemsPerPage));
    if (showRank) {
      const toolMap = new Map(tools.map((tool, index) => [tool.slug, index + 1]));
      setInitialToolMap(toolMap);
    }
  }, [tools, itemsPerPage, showRank]);

  useEffect(() => {
    if (tools.length <= itemsPerPage) {
      setDisplayedTools(tools);
      return;
    }

    const timer = setInterval(() => {
      setDisplayedTools(prevTools => {
        const newTools = [...prevTools];
        const newBatch = getNextBatch(newTools, tools, itemsToUpdate);
        
        for (let i = 0; i < itemsToUpdate; i++) {
          const randomIndex = Math.floor(Math.random() * newTools.length);
          if (newBatch[i]) {
            newTools[randomIndex] = newBatch[i];
          }
        }
        
        const finalToolsMap = new Map(newTools.map(t => [t.slug, t]));
        let finalTools = Array.from(finalToolsMap.values());

        if (finalTools.length < itemsPerPage) {
          const needed = itemsPerPage - finalTools.length;
          const filler = getNextBatch(finalTools, tools, needed);
          finalTools.push(...filler);
        }

        return finalTools.slice(0, itemsPerPage);
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
        {displayedTools.map((tool) => (
          <motion.div
            key={tool.slug}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <ToolCard 
              tool={tool} 
              tag={tag}
              rank={showRank ? initialToolMap.get(tool.slug) : undefined} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RotatingToolCarousel;
