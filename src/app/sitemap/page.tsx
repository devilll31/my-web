
import { getAllToolsByCategories } from '@/lib/tools-data';
import Link from 'next/link';

export default function SitemapPage() {
  const categoriesWithTools = getAllToolsByCategories();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Sitemap</h1>
          <p className="text-lg text-muted-foreground">
            A complete list of all pages and tools available on D2ools.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4 border-b pb-2">Main Pages</h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <li><Link href="/" className="hover:text-primary hover:underline">Home</Link></li>
              <li><Link href="/tools" className="hover:text-primary hover:underline">All Tools</Link></li>
              <li><Link href="/blog" className="hover:text-primary hover:underline">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary hover:underline">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:underline">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary hover:underline">FAQ</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4 border-b pb-2">All Tools by Category</h2>
            {categoriesWithTools.map((category) => (
              <div key={category.slug} className="mb-6">
                <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 text-sm">
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
  );
}
