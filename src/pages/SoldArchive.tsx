import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

const soldProducts = products.filter(p => p.sold);

import usePageTitle from "@/hooks/usePageTitle";

const SoldArchive = () => {
  usePageTitle("Sold Archive");
  return (
  <main className="container mx-auto px-4 py-16">
    <h1 className="text-2xl font-bold sm:text-3xl">Sold Archive</h1>
    <p className="mt-2 text-muted-foreground">Previously sold cards. Browse to see the kind of cards we carry.</p>

    {soldProducts.length === 0 ? (
      <p className="py-20 text-center text-muted-foreground">No sold items yet.</p>
    ) : (
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {soldProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )}
  </main>
);

};

export default SoldArchive;
