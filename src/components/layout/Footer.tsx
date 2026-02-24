import { Link } from 'react-router-dom';
import settings from '../../../content/settings/site.json';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-black text-primary-foreground">P-E</span>
              </div>
              <div>
                <span className="text-lg font-bold">Phase-E</span>
                <span className="ml-1 text-xs font-medium text-muted-foreground">TCG</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Authentic Japanese Pokemon Cards. Direct From Japan.
            </p>
            {settings.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon />
                <span>Follow us on Instagram</span>
              </a>
            )}
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Cards</Link>
              <Link to="/shop?graded=true" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Graded Cards</Link>
              <Link to="/sold-archive" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sold Archive</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Information</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Trust & Security</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>100% Authentic Cards</p>
              <p>Shipped from Japan</p>
              <p>Secure Payments</p>
              <p>International Shipping</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          {new Date().getFullYear()} Phase-E TCG. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
