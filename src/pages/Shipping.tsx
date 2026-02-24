import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import usePageTitle from "@/hooks/usePageTitle";

const Shipping = () => {
  usePageTitle("Shipping & Returns");
  return (
  <main className="container mx-auto px-4 py-16">
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold sm:text-4xl">Shipping & Returns</h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Shipping</h2>
        <div className="mt-4 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>All orders ship from Japan with tracking. We take great care in packaging every card to ensure it arrives safely.</p>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold text-foreground">Shipping Rates</h3>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between"><span>Standard International (7-14 days)</span><span className="font-medium text-foreground">$5.00</span></div>
              <div className="flex justify-between"><span>Express International (3-7 days)</span><span className="font-medium text-foreground">$15.00</span></div>
              <div className="flex justify-between"><span>Free Shipping on orders over</span><span className="font-medium text-foreground">$100.00</span></div>
            </div>
          </div>

          <p>Cards are shipped in penny sleeves + top loaders inside a padded envelope or small box depending on order size. Graded cards are shipped in fitted boxes with additional protection.</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Returns Policy</h2>
        <div className="mt-4 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>We want you to be completely satisfied with your purchase. If a card doesn't match its listed condition, we'll make it right.</p>

          <div className="rounded-xl border p-4 space-y-2">
            <p><span className="font-medium text-foreground">14-Day Return Window:</span> Contact us within 14 days of delivery.</p>
            <p><span className="font-medium text-foreground">Condition Mismatch:</span> If the card condition doesn't match our listing, we offer a full refund including return shipping.</p>
            <p><span className="font-medium text-foreground">Change of Mind:</span> Returns accepted within 14 days. Buyer pays return shipping. Card must be in the same condition as received.</p>
            <p><span className="font-medium text-foreground">Graded Cards:</span> Graded cards can be returned if the slab is damaged during shipping.</p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <Button asChild variant="outline">
          <Link to="/contact">Have questions? Contact us →</Link>
        </Button>
      </div>
    </div>
  </main>
);

};

export default Shipping;
