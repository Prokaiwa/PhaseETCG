import { Shield, Globe, Star, Heart } from 'lucide-react';

import usePageTitle from "@/hooks/usePageTitle";

const About = () => {
  usePageTitle("About");
  return (
  <main className="container mx-auto px-4 py-16">
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold sm:text-4xl">About Phase-E TCG</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        Phase-E TCG is a curated marketplace for authentic Japanese Pokémon cards. 
        We source every card directly from Japan, ensuring authenticity and quality 
        that collectors worldwide can trust.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {[
          { icon: Shield, title: 'Authenticity Guaranteed', desc: 'Every card is verified authentic. We source exclusively from trusted Japanese suppliers and inspect every card before listing.' },
          { icon: Globe, title: 'Direct From Japan', desc: 'Based in Japan, we have access to Japanese-exclusive cards, sets, and promos that are difficult to find elsewhere.' },
          { icon: Star, title: 'Transparent Grading', desc: 'Our condition grading follows strict standards. Each card is photographed in detail so you know exactly what you\'re getting.' },
          { icon: Heart, title: 'Collector Focused', desc: 'We\'re collectors ourselves. We understand the joy of finding that perfect card and treat every order with care.' },
        ].map(item => (
          <div key={item.title} className="rounded-xl border bg-card p-6">
            <item.icon className="h-8 w-8 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Our Grading Guide</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We use a standardized grading system to ensure transparency:
        </p>
        <div className="mt-6 space-y-3">
          {[
            { grade: 'Mint', desc: 'Perfect condition. No visible flaws under close inspection.' },
            { grade: 'Near Mint', desc: 'Minimal wear. May have very faint edge whitening.' },
            { grade: 'Excellent', desc: 'Light wear visible on edges or corners. Great display condition.' },
            { grade: 'Great', desc: 'Moderate wear. Small scratches or edge wear present.' },
            { grade: 'Played', desc: 'Noticeable wear from play use. Still structurally sound.' },
            { grade: 'Heavily Played', desc: 'Significant wear, creases, or damage. Priced accordingly.' },
            { grade: 'Damaged', desc: 'Major flaws present. Listed for completeness at deep discount.' },
          ].map(item => (
            <div key={item.grade} className="flex gap-3 rounded-lg border p-3">
              <span className="w-32 shrink-0 text-sm font-semibold">{item.grade}</span>
              <span className="text-sm text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </main>
);

};

export default About;
