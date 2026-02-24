import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import EbayIcon from '@/components/ui/EbayIcon';
import ProductCard from '@/components/shop/ProductCard';
import usePageTitle from '@/hooks/usePageTitle';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  usePageTitle(product?.title || 'Card Not Found');

  if (!product) {
    return (
      <main className="container mx-auto flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Card not found</h1>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/shop">← Back to Shop</Link>
          </Button>
        </div>
      </main>
    );
  }

  const isSold = product.sold || product.quantity === 0;
  const hasEbay = !!product.ebayUrl;
  const hasPaypal = !!product.paypalSell;

  const related = products
    .filter(p => p.id !== product.id && !p.sold && p.quantity > 0 && (p.category === product.category || p.set === product.set))
    .slice(0, 3);

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8">
      <Link to="/shop" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center rounded-2xl bg-muted/30 p-6 sm:p-8">
          <img
            src={product.images[0]}
            alt={product.title}
            className={`max-h-[350px] sm:max-h-[500px] w-auto object-contain ${isSold ? 'opacity-60' : ''} ${product.graded ? 'card-glow-yellow' : ''}`}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            {isSold && <Badge variant="destructive">SOLD</Badge>}
            {product.featured && !isSold && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
            {product.graded && <Badge variant="secondary">{product.gradingCompany} {product.gradeScore}</Badge>}
            <Badge variant="outline">{product.condition}</Badge>
            <Badge variant="outline">{product.rarity}</Badge>
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl font-bold">{product.title}</h1>
          <p className="mt-1 text-muted-foreground">{product.set} · {product.cardNumber}</p>
          <p className="mt-4 text-3xl sm:text-4xl font-black">${product.price.toFixed(2)}</p>

          {!isSold && product.quantity <= 3 && (
            <p className="mt-1 text-sm font-medium text-brand-red">Only {product.quantity} left!</p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Card details table */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl border p-4 text-sm">
            <div><span className="text-muted-foreground">Category:</span> <span className="font-medium">{product.category}</span></div>
            <div><span className="text-muted-foreground">Subcategory:</span> <span className="font-medium">{product.subcategory}</span></div>
            <div><span className="text-muted-foreground">Set:</span> <span className="font-medium">{product.set}</span></div>
            <div><span className="text-muted-foreground">Number:</span> <span className="font-medium">{product.cardNumber}</span></div>
            <div><span className="text-muted-foreground">Condition:</span> <span className="font-medium">{product.condition}</span></div>
            <div><span className="text-muted-foreground">Rarity:</span> <span className="font-medium">{product.rarity}</span></div>
            {product.graded && (
              <>
                <div><span className="text-muted-foreground">Grade:</span> <span className="font-medium">{product.gradingCompany} {product.gradeScore}</span></div>
                {product.population && <div><span className="text-muted-foreground">Population:</span> <span className="font-medium">{product.population}</span></div>}
                {product.certNumber && <div><span className="text-muted-foreground">Cert #:</span> <span className="font-medium">{product.certNumber}</span></div>}
              </>
            )}
          </div>

          {/* Checkout */}
          {!isSold && (
            <div className="mt-6 flex flex-col gap-3">
              {hasPaypal && (
                <Button size="lg" className="w-full" onClick={() => addToCart(product)}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              )}
              {hasEbay && (
                <Button size="lg" variant="outline" className="w-full" onClick={() => window.open(product.ebayUrl, '_blank')}>
                  <EbayIcon size="lg" /> <span className="ml-2">Buy on eBay</span>
                </Button>
              )}
              {!hasPaypal && !hasEbay && (
                <div className="rounded-xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                  Interested in this card?{' '}
                  <Link to="/contact" className="font-medium text-primary hover:underline">Contact us</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Cards */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">You Might Also Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
