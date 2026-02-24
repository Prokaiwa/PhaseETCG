import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, X, Menu } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const { totalItems, items, totalPrice, removeFromCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handlePaypalCheckout = () => {
    if (items.length === 0) return;
    let url = `https://www.paypal.com/cgi-bin/webscr?cmd=_cart&upload=1&business=${encodeURIComponent(siteConfig.paypalEmail)}&currency_code=${siteConfig.paypalCurrency}`;
    items.forEach((item, index) => {
      const i = index + 1;
      url += `&item_name_${i}=${encodeURIComponent(item.product.title)}`;
      url += `&amount_${i}=${item.product.price.toFixed(2)}`;
      url += `&quantity_${i}=${item.quantity}`;
      url += `&item_number_${i}=${encodeURIComponent(item.product.id)}`;
    });
    window.open(url, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-black text-primary-foreground">P-E</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-foreground">Phase-E</span>
            <span className="ml-1 text-xs font-medium text-muted-foreground">TCG</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle>Your Cart ({totalItems})</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-1 flex-col gap-4 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      {items.map(item => (
                        <div key={item.product.id} className="flex items-center gap-3 rounded-lg border p-3">
                          <img src={item.product.images[0]} alt={item.product.title} className="h-16 w-12 rounded object-contain" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-2">{item.product.title}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeFromCart(item.product.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto border-t pt-4">
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <Button className="mt-4 w-full" variant="hero" onClick={handlePaypalCheckout}>
                        Checkout with PayPal
                      </Button>
                      <p className="mt-2 text-center text-xs text-muted-foreground">
                        You'll be taken to PayPal to complete your order
                      </p>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile hamburger */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t bg-surface p-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
