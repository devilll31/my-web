'use client';

import { useState, useEffect } from 'react';
import { suggestRelatedTools } from '@/ai/flows/suggest-related-tools';
import { type Tool, getToolBySlug } from '@/lib/tools-data';
import ToolCard from './tool-card';
import { Skeleton } from './ui/skeleton';

interface SuggestedToolsProps {
  currentToolName: string;
  allTools: Tool[];
}

export default function SuggestedTools({ currentToolName, allTools }: SuggestedToolsProps) {
  const [suggestedTools, setSuggestedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await suggestRelatedTools({ currentTool: currentToolName });
        
        // Filter out the current tool from suggestions
        const filteredToolNames = result.relatedTools.filter(name => name.toLowerCase() !== currentToolName.toLowerCase());

        // Map names to full tool objects
        const toolsMap = new Map(allTools.map(tool => [tool.name.toLowerCase(), tool]));
        
        const fullToolObjects = filteredToolNames
          .map(name => toolsMap.get(name.toLowerCase()))
          .filter((tool): tool is Tool => !!tool);

        // Shuffle and take first 5-10 tools
        const shuffledTools = fullToolObjects.sort(() => 0.5 - Math.random());
        setSuggestedTools(shuffledTools.slice(0, 10));

      } catch (e) {
        console.error("Failed to fetch tool suggestions:", e);
        setError('Could not load suggestions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [currentToolName, allTools]);

  return (
    <div className="bg-secondary/50 rounded-2xl p-8">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 font-headline">
        Suggested Tools
      </h2>
      
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
             <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-center text-destructive">{error}</p>}
      
      {!loading && !error && suggestedTools.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {suggestedTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      {!loading && !error && suggestedTools.length === 0 && (
        <p className="text-center text-muted-foreground">No suggestions available at the moment.</p>
      )}
    </div>
  );
}
