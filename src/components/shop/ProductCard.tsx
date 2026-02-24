import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import EbayIcon from '@/components/ui/EbayIcon';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const isSold = product.sold || product.quantity === 0;
  const hasEbay = !!product.ebayUrl;
  const hasPaypal = !!product.paypalSell;

  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-card-hover ${product.featured ? 'card-glow' : 'shadow-card'}`}>
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
        {isSold && <Badge variant="destructive" className="text-xs font-bold">SOLD</Badge>}
        {product.featured && !isSold && <Badge className="bg-accent text-accent-foreground text-xs font-bold">Featured</Badge>}
        {product.graded && (
          <Badge variant="secondary" className="text-xs">{product.gradingCompany} {product.gradeScore}</Badge>
        )}
      </div>

      <Link to={`/product/${product.slug}`} className="relative overflow-hidden bg-muted/30 p-4">
        <img
          src={product.images[0]}
          alt={product.title}
          className={`mx-auto h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${isSold ? 'opacity-60' : ''}`}
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.slug}`} className="hover:text-primary transition-colors">
          <h3 className="text-sm font-semibold line-clamp-2 leading-snug">{product.title}</h3>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{product.set} · {product.cardNumber}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          <span className="text-xs text-muted-foreground">{product.condition}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{product.rarity}</span>
        </div>

        <div className="mt-auto pt-3">
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          {!isSold && product.quantity <= 3 && product.quantity > 0 && (
            <p className="text-xs text-brand-red font-medium">Only {product.quantity} left</p>
          )}

          {!isSold && (
            <div className="mt-3 flex flex-col gap-2">
              {hasPaypal && (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={(e) => { e.preventDefault(); addToCart(product); }}
                >
                  <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                  Add to Cart
                </Button>
              )}
              {hasEbay && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={(e) => { e.preventDefault(); window.open(product.ebayUrl, '_blank'); }}
                >
                  <EbayIcon className="mr-1.5 h-6 w-10" />
                  Buy on eBay
                </Button>
              )}
              {!hasPaypal && !hasEbay && (
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link to={`/product/${product.slug}`}>View Card</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
