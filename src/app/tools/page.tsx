
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ToolCard from '@/components/tool-card';
import { getAllToolsByCategories } from '@/lib/tools-data';

export const metadata = {
  title: 'All Tools | D2ools',
  description: 'Browse all 500+ free online tools offered by D2ools. Find utilities for PDF, images, text, SEO, and more, all in one place.',
};

export default function AllToolsPage() {
  const categoriesWithTools = getAllToolsByCategories();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">All Tools by Category</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive suite of over 500+ tools. Everything you need for your digital tasks, organized by category.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
        >
          {categoriesWithTools.map((category) => (
            <AccordionItem value={category.slug} key={category.slug} id={category.slug} className="border-b-0 bg-card rounded-xl shadow-sm overflow-hidden">
              <AccordionTrigger className="text-xl font-semibold px-6 py-4 hover:no-underline hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `hsla(${category.color}, 70%, 50%, 0.1)`}}>
                     <category.icon className="h-6 w-6" style={{ color: `hsl(${category.color}, 70%, 50%)` }} />
                  </div>
                  <span style={{ color: `hsl(${category.color}, 80%, 30%)` }}>{category.name} ({category.tools.length} tools)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 bg-secondary/20">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-6">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
