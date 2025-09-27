import Link from 'next/link';
import Logo from '@/components/logo';
import { getCategories, getToolsByCategory, getToolBySlug } from '@/lib/tools-data';

export default function Footer() {
  const pages = [
      { name: 'Home', href: '/' },
      { name: 'All Tools', href: '/tools' },
      { name: 'Top 50', href: '/tools/top-50' },
      { name: 'Blogs', href: '/blog' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'About Us', href: '/contact#about' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Sitemap', href: '/sitemap' },
      { name: 'FAQ', href: '/faq' },
  ];

  const toolCategories = getCategories().slice(0, 10);
  
  const popularToolSlugs = [
    'pdf-to-word',
    'image-compressor',
    'json-to-csv',
    'word-counter',
    'whois-lookup',
    'emi-calculator',
    'percentage-calculator',
    'json-validator',
    'qr-code-generator',
    'verify-file-checksum'
  ];

  const popularTools = popularToolSlugs.map(slug => getToolBySlug(slug)).filter(Boolean) as any[];


  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-auto" isFooter={true} />
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
                    <Link href={page.href} className="text-sm text-slate-400 hover:text-primary footer-link">
                      <span className="footer-link-text">{page.name}</span>
                    </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Tool Categories</h3>
            <ul className="mt-4 space-y-2">
              {toolCategories.map(category => (
                <li key={category.slug}>
                    <Link href={`/tools#${category.slug}`} className="text-sm text-slate-400 hover:text-primary footer-link">
                      <span className="footer-link-text">{category.name}</span>
                    </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Popular Tools</h3>
            <ul className="mt-4 space-y-2">
                {popularTools.map(tool => (
                    <li key={tool.slug}>
                        <Link href={`/tools/${tool.slug}`} className="text-sm text-slate-400 hover:text-primary footer-link">
                          <span className="footer-link-text">{tool.name}</span>
                        </Link>
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
