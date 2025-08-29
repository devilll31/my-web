
'use client';

import { useState, useEffect } from 'react';
import { Tool } from '@/lib/tools-data';
import ToolCard from './tool-card';
import { AnimatePresence, motion } from 'framer-motion';

interface RotatingToolCarouselProps {
  tools: Tool[];
  tag?: string;
  itemsPerPage?: number;
  interval?: number;
}

const RotatingToolCarousel: React.FC<RotatingToolCarouselProps> = ({
  tools,
  tag,
  itemsPerPage = 5,
  interval = 20000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (tools.length <= itemsPerPage) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % tools.length);
    }, interval);

    return () => clearInterval(timer);
  }, [tools.length, itemsPerPage, interval]);

  const displayedTools = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const tool = tools[(currentIndex + i) % tools.length];
    if (tool) {
        displayedTools.push(tool);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <AnimatePresence mode="popLayout">
        {displayedTools.map((tool, index) => (
          <motion.div
            key={tool.slug + currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ToolCard tool={tool} tag={tag} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RotatingToolCarousel;
