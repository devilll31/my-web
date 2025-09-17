
import Link from 'next/link';
import Logo from '@/components/logo';
import { getCategories, getTop50Tools } from '@/lib/tools-data';

export default function Footer() {
  const pages = [
      { name: 'Home', href: '/' },
      { name: 'All Tools', href: '/tools' },
      { name: 'Top 50 Tools', href: '/tools/top-50' },
      { name: 'Top 20 Trending Tools', href: '/tools/trending' },
      { name: 'Top 20 Most Popular Tools', href: '/tools/popular' },
      { name: 'Top 20 Featured Tools', href: '/tools/featured' },
      { name: 'View All Trending Tools', href: '/tools/trending' },
      { name: 'View All Popular Tools', href: '/tools/popular' },
      { name: 'View All Featured Tools', href: '/tools/featured' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'About', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Sitemap', href: '/sitemap.xml' },
  ];

  const toolCategories = getCategories().slice(0, 15);
  const popularTools = getTop50Tools().slice(0, 15);

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              The next level of online utility tools. Fast, free, and easy to use for all your digital needs.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Pages</h3>
            <ul className="mt-4 space-y-2">
              {pages.map(page => (
                 <li key={page.name}>
                    <Link href={page.href} className="text-sm text-slate-400 hover:text-primary">{page.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Tool Categories</h3>
            <ul className="mt-4 space-y-2">
              {toolCategories.map(category => (
                <li key={category.slug}>
                    <Link href={`/tools#${category.slug}`} className="text-sm text-slate-400 hover:text-primary">{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Popular Tools</h3>
            <ul className="mt-4 space-y-2">
                {popularTools.map(tool => (
                    <li key={tool.slug}>
                        <Link href={`/tools/${tool.slug}`} className="text-sm text-slate-400 hover:text-primary">{tool.name}</Link>
                    </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} D2ools.com All Rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
