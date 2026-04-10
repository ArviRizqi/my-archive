import { Link } from 'react-router-dom';
import { getFeaturedWorks, works } from '@/data/works';
import { Heart, Clock, Sparkles } from 'lucide-react';

export const FavoritesSidebar = () => {
  const favorites = getFeaturedWorks();
  
  // Get recent works (sorted by date)
  const recentWorks = [...works]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <aside className="sticky top-24 hidden h-fit w-72 shrink-0 space-y-6 lg:block">
      {/* Author's Favorites */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <Heart size={14} className="text-primary" />
          <h3 className="text-xs font-medium uppercase tracking-widest text-primary">
            Author's Favorites
          </h3>
        </div>
        <nav className="space-y-1">
          {favorites.map((work) => (
            <Link
              key={work.id}
              to={`/work/${work.id}`}
              className="group block rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
            >
              <span className="block font-medium text-foreground group-hover:text-primary transition-colors">
                {work.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Recently Added */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <Clock size={14} className="text-primary" />
          <h3 className="text-xs font-medium uppercase tracking-widest text-primary">
            Recently Added
          </h3>
        </div>
        <nav className="space-y-1">
          {recentWorks.map((work) => (
            <Link
              key={work.id}
              to={`/work/${work.id}`}
              className="group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
            >
              <Sparkles size={12} className="mt-1 text-muted-foreground group-hover:text-primary shrink-0" />
              <div className="min-w-0">
                <span className="block truncate font-medium text-foreground group-hover:text-primary transition-colors">
                  {work.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(work.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

    </aside>
  );
};
