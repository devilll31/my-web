import Link from 'next/link';
import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">D2ools</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The next level of online utility tools. Fast, free, and easy to use.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Tools</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/tools#pdf-tools" className="text-sm text-muted-foreground hover:text-primary">PDF Tools</Link>
              </li>
              <li>
                <Link href="/tools#image-tools" className="text-sm text-muted-foreground hover:text-primary">Image Tools</Link>
              </li>
              <li>
                <Link href="/tools#writing-tools" className="text-sm text-muted-foreground hover:text-primary">Writing Tools</Link>
              </li>
               <li>
                <Link href="/tools" className="text-sm text-muted-foreground hover:text-primary">All Tools</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} D2ools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
