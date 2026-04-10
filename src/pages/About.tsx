import { Layout } from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        {/* Header */}
        <header className="mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            About
          </span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            The Writer
          </h1>
        </header>

        {/* Bio */}
        <div className="prose-literary space-y-6">
          <p>
            I've been writing for as long as I can remember—first in the margins of school 
            notebooks, then in journals that grew increasingly dog-eared with use, and 
            eventually on the pages of published books that still feel like dreams made 
            tangible.
          </p>

          <p>
            My work explores the quiet territories of human experience: solitude and 
            connection, memory and forgetting, the way light falls through windows in 
            late afternoon, the conversations we have with ourselves when no one is 
            listening.
          </p>

          <p>
            I believe in the power of slowness. In a world that moves ever faster, I'm 
            drawn to the deliberate pace of careful sentences, the patience required to 
            find exactly the right word. Writing, for me, is a practice of attention—a 
            way of being present in the world more fully than I otherwise might be.
          </p>

          <p>
            I live in a small house near the sea, where the sound of waves serves as both 
            companion and metronome. When not writing, I walk, read, and tend a garden 
            that teaches me as much about patience as any book ever could.
          </p>

          <p>
            This archive represents two decades of work—some published, some shared here 
            for the first time. I hope you find something in these pages that resonates, 
            that lingers, that makes you pause and pay attention to your own quiet moments.
          </p>
        </div>

        {/* Writing Philosophy Section */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            On Writing
          </h2>
          
          <div className="prose-literary mt-6 space-y-6">
            <p>
              I write to understand what I think. The act of putting words on paper is, 
              for me, an act of discovery—I rarely know what I truly feel about something 
              until I've tried to write about it.
            </p>

            <p>
              My process is simple: I show up. Every day, at the same hour, I sit down 
              with my coffee and my notebook and I wait. Sometimes the words come easily; 
              often they don't. But the practice of showing up, of making myself available 
              to whatever might arrive, is the essential thing.
            </p>

            <blockquote className="my-8 border-l-2 border-primary pl-6 italic">
              "The blank page is not empty—it's full of possibility. Our work is simply 
              to discover which possibilities want to be made real."
            </blockquote>

            <p>
              I'm drawn to writers who take their time: Marilynne Robinson, W.G. Sebald, 
              Mary Oliver. Writers for whom every word matters, every silence is intentional. 
              This is the tradition I aspire to, even when I fall short.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-16 rounded-lg border border-border bg-card p-8 md:p-10">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Get in Touch
          </h2>
          <p className="mt-4 font-serif text-literary">
            For inquiries about readings, publications, or simply to share your thoughts, 
            you're welcome to reach me at{' '}
            <a 
              href="mailto:hello@eleanorvance.com" 
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              hello@eleanorvance.com
            </a>
          </p>
        </section>
      </article>
    </Layout>
  );
};

export default About;
