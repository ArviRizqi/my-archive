import { Layout } from '@/components/Layout';
import { WorkCard } from '@/components/WorkCard';
import { FavoritesSidebar } from '@/components/FavoritesSidebar';
import { useFeaturedWorks } from '@/hooks/useWorks';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { data: featuredWorks, isLoading } = useFeaturedWorks();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="animate-fade-in-up font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Sisa makna <br />
            yang tak ikut pergi 
            <span className="block text-primary">saat waktu membalik kisah</span>
          </h1>
          
          <p className="mt-8 animate-fade-in-up font-serif text-lg leading-relaxed text-literary delay-100 md:text-xl">
            Selamat datang di arsip saya—kumpulan puisi, cerita pendek, prosa, dan kutipan <br />
            yang ditulis selama dua dekade mendengarkan dunia dan mencoba menerjemahkan <br /> 
            bisikannya ke dalam kata-kata.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up delay-200">
            <Link
              to="/poetry"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Explore Puisi
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-border" />
      </div>

      {/* Featured Works Section with Sidebar */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  Featured
                </span>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                  Terbaru
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {isLoading ? (
                <div className="col-span-2 flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : featuredWorks?.map((work, index) => (
                <div
                  key={work.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <WorkCard work={work} showCategory />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <FavoritesSidebar />
        </div>
      </section>

    </Layout>
  );
};

export default Index;
