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
      <div className="relative w-full h-full p-6 bg-card rounded-2xl shadow-sm border border-border/50 transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-primary/50 group-hover:-translate-y-1 overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-4">
               {category.icon && (
                <category.icon className="h-8 w-8 text-primary" />
              )}
            </div>
            <h3 className="text-lg font-bold font-headline mb-2">{tool.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
              {tool.description}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-primary text-sm font-medium group-hover:text-accent transition-colors">
              Use Now <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
