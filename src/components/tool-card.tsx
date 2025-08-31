
'use client';

import Link from 'next/link';
import { type Tool } from '@/lib/tools-data';
import { Button } from '@/components/ui/button';
import { getCategoryBySlug } from '@/lib/tools-data';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  tool: Tool;
  className?: string;
  tag?: string;
  rank?: number;
}

export default function ToolCard({ tool, className, tag, rank }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);

  if (!category) return null;

  const isAiTool = tool.slug.includes('-ai');
  const categoryColor = category.color;

  const getTagVariant = (tagName?: string) => {
    switch(tagName?.toLowerCase()) {
      case 'trending':
        return 'destructive';
      case 'popular':
        return 'default';
      case 'featured':
        return 'secondary';
      default:
        return 'secondary';
    }
  }
  
  const getTagClass = (tagName?: string) => {
    switch(tagName?.toLowerCase()) {
      case 'trending':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'popular':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'featured':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
         return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }

  return (
    <Link href={`/tools/${tool.slug}`} className={cn("group block", className)}>
      <div 
        className="relative w-full h-full p-4 bg-card rounded-lg shadow-sm border transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 overflow-hidden"
        style={{ '--category-color': `hsl(${categoryColor})` } as React.CSSProperties}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-start justify-between mb-3 min-h-[34px]">
               {category.icon && (
                <div className="p-2 rounded-md" style={{ backgroundColor: `hsla(${categoryColor}, 70%, 50%, 0.2)`}}>
                  <category.icon className="h-5 w-5" style={{ color: 'var(--category-color)' }} />
                </div>
              )}
              <div className="flex flex-col items-end gap-1">
                {rank && (
                    <div 
                      className="text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-10"
                      style={{ backgroundColor: 'var(--category-color)' }}
                    >
                      {rank}
                    </div>
                )}
                {tag && <Badge variant={getTagVariant(tag)} className={cn(getTagClass(tag))}>{tag}</Badge>}
              </div>
            </div>
            <h3 className="text-sm font-bold font-headline mb-1">{tool.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[30px]">
              {tool.description}
            </p>
          </div>
          <div className="mt-4">
             <Button size="sm" className="w-full text-sm font-semibold justify-between group btn-gradient">
                <span className="text-white group-hover:text-black transition-colors duration-300">Use Now</span>
                <ArrowRight className="h-4 w-4 text-white group-hover:text-black transition-colors duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
