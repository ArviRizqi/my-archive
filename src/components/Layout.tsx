import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/archive', label: 'Archive' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <nav className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="font-serif text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              Eleanor Vance
            </Link>

            <div className="hidden items-center gap-4 md:flex">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`link-literary text-sm font-medium tracking-wide transition-colors ${
                        location.pathname === link.path
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 border-t border-border pt-4 md:hidden">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 text-base font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </header>

      <main className="animate-fade-in">{children}</main>

      <footer className="mt-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-serif text-lg text-foreground">Eleanor Vance</p>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
