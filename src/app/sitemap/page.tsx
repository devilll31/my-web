
import { getAllToolsByCategories } from '@/lib/tools-data';
import Link from 'next/link';

export default function SitemapPage() {
  const categoriesWithTools = getAllToolsByCategories();

  const mainPages = [
    { href: '/', name: 'Home' },
    { href: '/tools', name: 'All Tools' },
    { href: '/blog', name: 'Blogs' },
    { href: '/contact', name: 'Contact Us' },
    { href: '/faq', name: 'FAQ' },
    { href: '/privacy-policy', name: 'Privacy Policy' },
    { href: '/terms-of-service', name: 'Terms of Service' },
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoriesWithTools.map((category) => (
                <div key={category.slug} className="mb-6">
                  <Link href={`/tools#${category.slug}`}>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 hover:text-primary transition-colors">
                      <category.icon className="w-5 h-5 text-primary" />
                      {category.name}
                    </h3>
                  </Link>
                  <ul className="space-y-2 text-sm">
                    {category.tools.map((tool) => (
                      <li key={tool.slug}>
                        <Link href={`/tools/${tool.slug}`} className="text-muted-foreground hover:text-primary hover:underline">
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
