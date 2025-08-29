
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
      <div className="relative w-full h-full p-4 bg-card rounded-lg shadow-sm border transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary/30 hover:-translate-y-1 overflow-hidden">
        {rank && (
            <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-10">
              #{rank}
            </div>
        )}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-3">
               {category.icon && (
                <div className="p-2 bg-primary/10 rounded-md">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
              )}
              {tag && <Badge variant={getTagVariant(tag)} className={cn(getTagClass(tag))}>{tag}</Badge>}
            </div>
            <h3 className="text-sm font-bold font-headline mb-1">{tool.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[30px]">
              {tool.description}
            </p>
          </div>
          <div className="mt-4">
             <Button size="sm" variant="outline" className="w-full text-sm font-semibold justify-between btn-gradient text-white">
                <span>Use Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
