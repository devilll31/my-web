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
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">All Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive suite of over 500+ tools. Everything you need for your digital tasks, organized by category.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={categoriesWithTools.map((cat) => cat.slug)}
        >
          {categoriesWithTools.map((category) => (
            <AccordionItem value={category.slug} key={category.slug} id={category.slug} className="border-b mb-4 bg-card rounded-lg shadow-sm">
              <AccordionTrigger className="text-xl font-semibold px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4">
                  <category.icon className="h-6 w-6 text-primary" />
                  <span>{category.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
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
