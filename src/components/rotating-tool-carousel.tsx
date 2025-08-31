
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
}

const RotatingToolCarousel: React.FC<RotatingToolCarouselProps> = ({
  tools,
  itemsPerPage = 10,
  interval = 15000,
  itemsToUpdate = 4,
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
    const remainingTools = allTools.filter(tool => !currentTools.some(t => t.slug === tool.slug));
    const shuffledRemaining = shuffleArray(remainingTools);
    return shuffledRemaining.slice(0, count);
  }, []);

  useEffect(() => {
    const shuffledTools = shuffleArray([...tools]);
    setDisplayedTools(shuffledTools.slice(0, itemsPerPage));
  }, [tools, itemsPerPage]);

  useEffect(() => {
    if (tools.length <= itemsPerPage) {
      // No rotation if there aren't enough tools to rotate
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
        
        // Ensure no duplicates in the final list
        const finalToolsMap = new Map(newTools.map(t => [t.slug, t]));
        let finalTools = Array.from(finalToolsMap.values());

        // If we somehow have fewer than itemsPerPage, fill it up
        if (finalTools.length < itemsPerPage) {
          const needed = itemsPerPage - finalTools.length;
          const filler = getNextBatch(finalTools, tools, needed);
          finalTools.push(...filler);
        }

        return finalTools;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [tools, itemsPerPage, interval, itemsToUpdate, getNextBatch]);

  if (!displayedTools.length) {
    return null; // Or a loading skeleton
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <AnimatePresence>
        {displayedTools.map((tool, index) => (
          <motion.div
            key={tool.slug}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: (index % itemsToUpdate) * 0.1 }}
          >
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RotatingToolCarousel;
