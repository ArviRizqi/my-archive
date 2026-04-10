import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useWork, categoryLabels } from '@/hooks/useWorks';
import { WorkSidebar } from '@/components/WorkSidebar';
import { ArrowLeft, Loader2 } from 'lucide-react';

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: work, isLoading } = useWork(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!work) {
    return <Navigate to="/" replace />;
  }

  const formattedDate = new Date(work.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-12 md:py-16">
        {/* Main Content */}
        <article className="min-w-0 max-w-3xl flex-1">
          {/* Back Link */}
          <Link
            to={`/${work.category}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to {categoryLabels[work.category]}
          </Link>

          {/* Header */}
          <header className="mb-12 border-b border-border pb-8">
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {categoryLabels[work.category]}
            </span>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
              {work.title}
            </h1>
            <time className="mt-4 block text-sm text-muted-foreground">
              {formattedDate}
            </time>
          </header>

          {/* Content */}
          <div className="prose-literary">
            {work.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-border pt-8">
            <Link
              to={`/${work.category}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <ArrowLeft size={16} />
              More {categoryLabels[work.category]}
            </Link>
          </footer>
        </article>

        {/* Sticky Sidebar */}
        <WorkSidebar category={work.category} />
      </div>
    </Layout>
  );
};

export default WorkDetail;
