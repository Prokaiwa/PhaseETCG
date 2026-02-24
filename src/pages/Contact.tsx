import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare } from 'lucide-react';
import usePageTitle from '@/hooks/usePageTitle';
import settings from '../../content/settings/site.json';

const Contact = () => {
  usePageTitle('Contact');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${settings.contactEmail}?subject=${encodeURIComponent(form.subject || 'Contact Form')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">
          Have a question about a card or your order? We are here to help.
        </p>

        <div className="mt-8 flex gap-4">
          <div className="flex-1 rounded-xl border bg-card p-4 text-center">
            <Mail className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-2 text-sm font-medium">Email</p>
            <p className="text-xs text-muted-foreground">{settings.contactEmail}</p>
          </div>
          <div className="flex-1 rounded-xl border bg-card p-4 text-center">
            <MessageSquare className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-2 text-sm font-medium">Response Time</p>
            <p className="text-xs text-muted-foreground">Within 24 hours</p>
          </div>
        </div>

        {sent ? (
          <div className="mt-8 rounded-xl border bg-card p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
              OK
            </div>
            <h2 className="mt-4 text-xl font-bold">Message Ready to Send!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your email app should have opened with your message pre-filled. Just hit send!
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              If it did not open, email us directly at{" "}
              <a href={`mailto:${settings.contactEmail}`} className="text-primary hover:underline">
                {settings.contactEmail}
              </a>
            </p>
            <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
              Send Another Message
            </Button>
          </div>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Subject</label>
              <Input
                placeholder="Order inquiry, card question, etc."
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Message</label>
              <Textarea
                placeholder="Tell us how we can help..."
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <Button variant="default" size="lg" type="submit">Send Message</Button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Contact;
