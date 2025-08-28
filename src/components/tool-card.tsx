
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
}

export default function ToolCard({ tool, className, tag }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);

  if (!category) return null;

  const isFeatured = tag ? false : tool.slug.includes('-ai');

  const getTagVariant = (tagName?: string) => {
    switch(tagName?.toLowerCase()) {
      case 'trending':
        return 'secondary';
      case 'popular':
        return 'default';
      case 'featured':
        return 'destructive';
      default:
        return 'secondary';
    }
  }

  return (
    <Link href={`/tools/${tool.slug}`} className={cn("group block", className)}>
      <div className="relative w-full h-full p-4 bg-card rounded-lg shadow-sm border transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary/30 hover:-translate-y-1 overflow-hidden">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-3">
               {category.icon && (
                <div className="p-2 bg-primary/10 rounded-md">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
              )}
              {tag && <Badge variant={getTagVariant(tag)}>{tag}</Badge>}
              {isFeatured && <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">Featured</Badge>}
            </div>
            <h3 className="text-sm font-bold font-headline mb-1">{tool.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[30px]">
              {tool.description}
            </p>
          </div>
          <div className="mt-4">
             <Button size="sm" variant="outline" className="w-full text-sm font-semibold justify-between border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40">
                <span>View Tool</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

    