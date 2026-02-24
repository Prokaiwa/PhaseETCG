import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Plane, Eye, Truck } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import usePageTitle from '@/hooks/usePageTitle';
import heroBg from '@/assets/hero-bg.jpg';
import { useState } from 'react';

const featuredProducts = products.filter(p => p.featured && !p.sold).slice(0, 6);
const recentSold = products.filter(p => p.sold).slice(0, 6);

const trustPoints = [
  { icon: Shield, title: 'Authentic Japanese Cards', desc: 'Every card sourced directly from Japan. 100% genuine.' },
  { icon: Plane, title: 'Direct From Japan', desc: 'We ship internationally from our base in Japan.' },
  { icon: Eye, title: 'Transparent Grading', desc: 'Honest condition grading with detailed photos.' },
  { icon: Truck, title: 'Fast International Shipping', desc: 'Tracked shipping to USA, UK, AU, CA and more.' },
];

const Index = () => {
  usePageTitle('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Japanese Pokémon cards collection" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="animate-slide-up text-4xl font-black tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
            Phase-E TCG
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80 animate-fade-in">
            Authentic Japanese Pokémon Cards. Direct From Japan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-in">
            <Button asChild variant="hero" size="lg">
              <Link to="/shop">Shop Cards</Link>
            </Button>
            <Button asChild variant="hero-outline" size="lg">
              <Link to="/shop?graded=true">View Graded Cards</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Featured Cards</h2>
          <p className="mt-2 text-muted-foreground">Hand-picked gems from our latest inventory</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/shop">View All Cards →</Link>
          </Button>
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">Why Buy From Us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map(point => (
              <div key={point.title} className="rounded-xl border bg-background p-6 text-center transition-all hover:shadow-card-hover">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <point.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">{point.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Sold */}
      {recentSold.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Recently Sold</h2>
            <p className="mt-2 text-muted-foreground">These cards found new homes — see what's been popular</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentSold.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/sold-archive">View Full Archive →</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">Stay Updated</h2>
          <p className="mt-2 text-primary-foreground/70">Get notified when we add new cards to the shop.</p>
          {subscribed ? (
            <div className="mx-auto mt-6 max-w-md rounded-xl bg-primary-foreground/10 px-6 py-4">
              <p className="text-lg font-semibold text-primary-foreground">🎉 You're in!</p>
              <p className="mt-1 text-sm text-primary-foreground/70">We'll let you know when new cards drop.</p>
            </div>
          ) : (
            <form className="mx-auto mt-6 flex max-w-md gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 rounded-lg border-0 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="hero" type="submit">Subscribe</Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Index;
