
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} E-Automate-SafSaba, Inc. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <Link href="/safwansaba" className="text-muted-foreground hover:text-foreground transition-colors">
              About Me
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
