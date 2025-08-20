import Link from 'next/link';
import { type Tool } from '@/lib/tools-data';
import { Button } from '@/components/ui/button';
import { getCategoryBySlug } from '@/lib/tools-data';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export default function ToolCard({ tool, className }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);

  if (!category) return null;

  return (
    <Link href={`/tools/${tool.slug}`} className={cn("group block", className)}>
      <div className="relative w-full h-full p-4 bg-card rounded-2xl shadow-sm border border-border/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-3">
               {category.icon && (
                <category.icon className="h-7 w-7 text-primary" />
              )}
            </div>
            <h3 className="text-base font-bold font-headline mb-1">{tool.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[30px]">
              {tool.description}
            </p>
          </div>
          <div className="mt-3">
             <Button size="sm" variant="outline" className="w-full justify-between border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
                <span>Open</span>
                <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
