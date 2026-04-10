import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { WorkCard } from '@/components/WorkCard';
import { useWorks, categoryLabels, Category } from '@/hooks/useWorks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Filter, Grid, List, Loader2 } from 'lucide-react';

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: works = [], isLoading } = useWorks();

  const filteredWorks = useMemo(() => {
    if (!works) return [];
    let result = [...works];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        work =>
          work.title.toLowerCase().includes(query) ||
          work.excerpt.toLowerCase().includes(query) ||
          work.content.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(work => work.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [works, searchQuery, selectedCategory, sortBy]);

  const categories: (Category | 'all')[] = ['all', 'poetry', 'short-stories', 'prose', 'novels'];

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Header */}
        <div className="animate-fade-in-up">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            Complete Collection
          </span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Archive
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-literary">
            Browse the complete collection of works. Use the search and filters to find 
            exactly what you're looking for.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mt-10 space-y-4 animate-fade-in-up delay-100">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, excerpt, content, or genre..."
              className="pl-12 py-6 text-lg"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'All' : categoryLabels[cat]}
                </Button>
              ))}
            </div>

            {/* Sort and View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={sortBy === 'date' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('date')}
              >
                <Calendar className="mr-1 h-4 w-4" />
                Date
              </Button>
              <Button
                variant={sortBy === 'title' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('title')}
              >
                A-Z
              </Button>
              <div className="ml-2 flex rounded-md border border-border">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8">
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filteredWorks.length} of {works.length} works
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredWorks.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                  : 'space-y-4'
              }
            >
              {filteredWorks.map((work, index) => (
                <div
                  key={work.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <WorkCard work={work} showCategory variant={viewMode === 'list' ? 'horizontal' : 'vertical'} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No works found matching your criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Archive;
