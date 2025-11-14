import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const socialLinks = [
  { name: 'Twitter', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'LinkedIn', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary-foreground fill-primary" />
            <span className="font-headline text-xl font-bold">ChatterVerse</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ChatterVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
