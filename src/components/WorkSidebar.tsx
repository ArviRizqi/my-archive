import { Link, useParams } from 'react-router-dom';
import { useCategoryWorks, categoryLabels, Category } from '@/hooks/useWorks';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface WorkSidebarProps {
  category: Category;
}

export const WorkSidebar = ({ category }: WorkSidebarProps) => {
  const { id } = useParams<{ id: string }>();
  const { data: works, isLoading } = useCategoryWorks(category);

  return (
    <aside className="sticky top-24 hidden h-fit w-64 shrink-0 lg:block">
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
          Lainnya {categoryLabels[category]}
        </h3>
        
        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <nav className="space-y-1">
            {works?.map((work) => (
              <Link
                key={work.id}
                to={`/work/${work.id}`}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm transition-colors',
                  work.id === id
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {work.title}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
};
