import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Are these cards authentic?',
    a: 'Yes, 100%. Every card we sell is sourced directly from Japan through trusted suppliers. We inspect every card for authenticity before listing.',
  },
  {
    q: 'What\'s the difference between Japanese and English Pokémon cards?',
    a: 'Japanese Pokémon cards are printed in Japan and often feature exclusive artwork, different textures, and are generally produced to a higher quality standard. Many collectors prize Japanese cards for their unique art and rarity.',
  },
  {
    q: 'How do you grade your cards?',
    a: 'We follow a strict grading system from Mint to Damaged. Every card is closely inspected and photographed so you can see exact condition. For PSA/BGS/CGC graded cards, the grade is from the official grading company.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes! We ship to the USA, UK, Australia, Canada, and most other countries worldwide. All orders include tracking.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards through Stripe, including Visa, Mastercard, and American Express. We support USD, GBP, and AUD.',
  },
  {
    q: 'Can I return a card?',
    a: 'Yes. If a card doesn\'t match its listed condition, we offer full refunds within 14 days of delivery. See our Shipping & Returns page for details.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard international shipping typically takes 7-14 business days. Express options are available at checkout for 3-7 business days.',
  },
  {
    q: 'Do you offer grading services?',
    a: 'We don\'t offer grading services directly, but we sell pre-graded cards from PSA, BGS, and CGC. All certification numbers are provided for verification.',
  },
];

import usePageTitle from "@/hooks/usePageTitle";

const FAQ = () => {
  usePageTitle("FAQ");
  return (
  <main className="container mx-auto px-4 py-16">
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h1>
      <p className="mt-2 text-muted-foreground">Everything you need to know about buying from Phase-E TCG.</p>

      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </main>
);

};

export default FAQ;
