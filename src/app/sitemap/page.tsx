
import { getAllToolsByCategories, getCategoryBySlug } from '@/lib/tools-data';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SitemapPage() {
  const categoriesWithTools = getAllToolsByCategories();

  const mainPages = [
    { href: '/', name: 'Home' },
    { href: '/tools', name: 'All Tools' },
    { href: '/tools/top-50', name: 'Top 50' },
    { href: '/blog', name: 'Blogs' },
    { href: '/contact', name: 'Contact Us' },
    { href: '/contact#about', name: 'About Us' },
    { href: '/privacy-policy', name: 'Privacy Policy' },
    { href: '/terms-of-service', name: 'Terms of Service' },
    { href: '/sitemap', name: 'Sitemap' },
    { href: '/faq', name: 'FAQ' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 gradient-text">Sitemap</h1>
          <p className="text-lg text-muted-foreground">
            A complete guide to all pages and tools available on D2ools.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold font-headline mb-6 border-b pb-3">Main Pages</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {mainPages.map(page => (
                <Link key={page.href} href={page.href} className="group flex items-center gap-2 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                  <span className="text-primary">›</span>
                  <span className="font-medium group-hover:underline">{page.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold font-headline mb-6 border-b pb-3">All Tools by Category</h2>
            <Accordion type="single" collapsible className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoriesWithTools.map((category, index) => {
                 const catDetails = getCategoryBySlug(category.slug);
                 if (!catDetails) return null;
                return (
                  <AccordionItem value={category.slug} key={category.slug} className="border bg-card rounded-lg shadow-sm">
                    <AccordionTrigger className="text-lg text-left font-semibold p-4 hover:no-underline">
                       <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md" style={{ backgroundColor: `hsla(${catDetails.color}, 80%, 60%, 0.25)` }}>
                            <category.icon className="w-5 h-5" style={{ color: `hsl(${catDetails.color})` }} />
                        </div>
                        <span className="font-bold">{index + 1}.</span>
                        {category.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2 text-sm max-h-60 overflow-y-auto">
                        {category.tools.map((tool) => (
                          <li key={tool.slug}>
                            <Link href={`/tools/${tool.slug}`} className="text-muted-foreground hover:text-primary hover:underline">
                              {tool.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )})}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
