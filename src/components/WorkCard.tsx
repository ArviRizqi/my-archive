import { Link } from 'react-router-dom';
import { Work, categoryLabels, Category } from '@/hooks/useWorks';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  work: Work;
  showCategory?: boolean;
  variant?: 'vertical' | 'horizontal';
}

export const WorkCard = ({ work, showCategory = false, variant = 'vertical' }: WorkCardProps) => {
  const formattedDate = new Date(work.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isHorizontal = variant === 'horizontal';

  return (
    <article className="group">
      <Link to={`/work/${work.id}`} className="block">
        <div className={cn(
          "rounded-lg border border-transparent bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-sm md:p-8",
          isHorizontal && "flex items-center justify-between"
        )}>
          <div className={cn(isHorizontal && "flex-1 min-w-0")}>
            {showCategory && (
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  {categoryLabels[work.category]}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{work.genre}</span>
              </div>
            )}
            <h3 className={cn(
              "font-serif font-semibold text-foreground transition-colors group-hover:text-primary",
              isHorizontal ? "text-lg" : "text-xl md:text-2xl"
            )}>
              {work.title}
            </h3>
            {work.author && (
              <span className="mt-1 block text-sm italic text-muted-foreground">by {work.author}</span>
            )}
            <time className="mt-1 block text-sm text-muted-foreground">{formattedDate}</time>
          </div>
          <div className={cn(
            "flex items-center gap-2 text-sm font-medium text-primary",
            isHorizontal ? "ml-4 shrink-0" : "mt-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          )}>
            {!isHorizontal && "Read more"}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
};