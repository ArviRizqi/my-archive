import { Layout } from '@/components/Layout';
import { WorkCard } from '@/components/WorkCard';
import { FavoritesSidebar } from '@/components/FavoritesSidebar';
import { useCategoryWorks, categoryLabels, Category } from '@/hooks/useWorks';
import { Loader2 } from 'lucide-react';

interface CategoryPageProps {
  category: Category;
}

const categoryDescriptions: Record<Category, string> = {
  puisi: 'Kumpulan puisi yang merayakan keindahan bahasa dan emosi. Temukan karya-karya yang menyentuh hati dan menggugah imajinasi.',
  cerpen: 'Kumpulan cerpen yang menghadirkan kisah-kisah menarik dan beragam. Dari cerita ringan hingga yang penuh makna, temukan semuanya di sini.',
  prosa: 'Kumpulan prosa yang menampilkan gaya penulisan yang unik dan kreatif. Jelajahi karya-karya yang menggabungkan narasi dan ekspresi dengan indah.',
  kutipan: 'Kumpulan kutipan inspiratif dan bermakna dari berbagai karya sastra. Temukan kata-kata bijak yang dapat memotivasi dan memberikan wawasan baru.',
};

export const CategoryPage = ({ category }: CategoryPageProps) => {
  const { data: works = [], isLoading } = useCategoryWorks(category);
  const title = categoryLabels[category];
  const description = categoryDescriptions[category];

  return (
    <Layout>
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            Collection
          </span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 font-serif text-lg leading-relaxed text-literary">
            {description}
          </p>
        </div>
      </section>

      {/* Works Grid with Sidebar */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : works.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {works.map((work, index) => (
                  <div
                    key={work.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <WorkCard work={work} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">
                  Tidak ditemukan karya dalam kategori ini. Cobalah kategori lain atau kembali ke beranda untuk melihat karya terbaru.
                </p>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <FavoritesSidebar />
        </div>
      </section>
    </Layout>
  );
};