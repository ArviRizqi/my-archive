import { Link, useParams } from 'react-router-dom';
import { getCategoryWorks, categoryLabels, Category } from '@/data/works';
import { cn } from '@/lib/utils';

interface WorkSidebarProps {
  category: Category;
}

export const WorkSidebar = ({ category }: WorkSidebarProps) => {
  const { id } = useParams<{ id: string }>();
  const works = getCategoryWorks(category);

  return (
    <aside className="sticky top-24 hidden h-fit w-64 shrink-0 lg:block">
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
          More {categoryLabels[category]}
        </h3>
        <nav className="space-y-1">
          {works.map((work) => (
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
      </div>
    </aside>
  );
};
