import Link from 'next/link';
import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-12 w-28 text-primary" />
            </Link>
            <p className="text-sm text-slate-400">
              The next level of online utility tools. Fast, free, and easy to use.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Tool Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/tools#pdf-tools" className="text-sm text-slate-400 hover:text-primary">PDF Tools</Link>
              </li>
              <li>
                <Link href="/tools#image-tools" className="text-sm text-slate-400 hover:text-primary">Image Tools</Link>
              </li>
              <li>
                <Link href="/tools#writing-tools" className="text-sm text-slate-400 hover:text-primary">Writing Tools</Link>
              </li>
               <li>
                <Link href="/tools" className="text-sm text-slate-400 hover:text-primary">All Tools</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Popular Tools</h3>
            <ul className="mt-4 space-y-2">
                <li><Link href="/tools/background-remover" className="text-sm text-slate-400 hover:text-primary">Background Remover</Link></li>
                <li><Link href="/tools/image-compressor" className="text-sm text-slate-400 hover:text-primary">Image Compressor</Link></li>
                <li><Link href="/tools/pdf-to-word" className="text-sm text-slate-400 hover:text-primary">PDF to Word</Link></li>
                <li><Link href="/tools/qr-code-generator" className="text-sm text-slate-400 hover:text-primary">QR Code Generator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-primary">About</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-400 hover:text-primary">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-primary">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-slate-400 hover:text-primary">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} D2ools.com All Rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
