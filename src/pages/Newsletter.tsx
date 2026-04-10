import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Send, Loader2, BookOpen, Sparkles, Bell } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });

    if (error) {
      if (error.code === '23505') {
        toast.error('You\'re already subscribed!');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } else {
      setSubscribed(true);
      toast.success('Welcome to the newsletter!');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {subscribed ? (
          <div className="text-center animate-fade-in-up">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-semibold text-foreground md:text-4xl">
              You're In!
            </h1>
            <p className="mt-4 font-serif text-lg text-literary">
              Thank you for subscribing. You'll receive my next letter soon.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center animate-fade-in-up">
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                Stay Connected
              </span>
              <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
                Subscribe to My Newsletter
              </h1>
              <p className="mx-auto mt-6 max-w-xl font-serif text-lg leading-relaxed text-literary">
                Receive monthly letters with new works, behind-the-scenes glimpses into my 
                writing process, reading recommendations, and reflections on the craft.
              </p>
            </div>

            {/* Features */}
            <div className="mt-12 grid gap-6 md:grid-cols-3 animate-fade-in-up delay-100">
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-medium text-foreground">New Works</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Be the first to read new poetry and prose
                </p>
              </div>
              
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-medium text-foreground">Exclusive Content</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Writing tips and creative insights
                </p>
              </div>
              
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-medium text-foreground">Monthly Updates</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No spam, just meaningful content
                </p>
              </div>
            </div>

            {/* Subscribe Form */}
            <form onSubmit={handleSubmit} className="mt-12 animate-fade-in-up delay-200">
              <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                I respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Newsletter;
