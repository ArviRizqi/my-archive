import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useUserFavorites } from '@/hooks/useUserFavorites';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useWorks, Work } from '@/hooks/useWorks';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, BookOpen, Check, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const ReadingList = () => {
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading: favLoading } = useUserFavorites();
  const { progressMap, isCompleted, getProgress } = useReadingProgress();
  const { data: works = [], isLoading: worksLoading } = useWorks();

  if (authLoading || worksLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getWork = (id: string) => works.find(w => w.id === id);

  const favoriteWorks = favorites.map(id => getWork(id)).filter(Boolean) as Work[];
  const inProgressWorks = Object.entries(progressMap)
    .filter(([_, p]) => !p.completed && p.progress > 0)
    .map(([id]) => getWork(id))
    .filter(Boolean) as Work[];
  const completedWorks = Object.entries(progressMap)
    .filter(([_, p]) => p.completed)
    .map(([id]) => getWork(id))
    .filter(Boolean) as Work[];
  const notStartedWorks = works.filter(
    w => !progressMap[w.id] || progressMap[w.id].progress === 0
  );

  const WorkListItem = ({ work, showProgress = false }: { work: Work; showProgress?: boolean }) => (
    <Link
      to={`/work/${work.id}`}
      className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-lg font-medium truncate">{work.title}</h3>
          {isCompleted(work.id) && (
            <Check className="h-4 w-4 text-primary shrink-0" />
          )}
        </div>
        {work.author && (
          <p className="mt-1 text-sm italic text-muted-foreground truncate">by {work.author}</p>
        )}
        {showProgress && (
          <div className="mt-3">
            <Progress value={getProgress(work.id)} className="h-1.5" />
            <p className="mt-1 text-xs text-muted-foreground">
              {getProgress(work.id)}% complete
            </p>
          </div>
        )}
      </div>
      <ArrowRight className="ml-4 h-5 w-5 text-muted-foreground shrink-0" />
    </Link>
  );

  const EmptyState = ({ icon: Icon, message, action }: { icon: React.ElementType; message: string; action?: React.ReactNode }) => (
    <Card>
      <CardContent className="py-12 text-center">
        <Icon className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-muted-foreground">{message}</p>
        {action}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="animate-fade-in-up">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            Your Collection
          </span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Reading List
          </h1>
          <p className="mt-4 text-muted-foreground">
            Track your reading progress and manage your favorites
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <Heart className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-2xl font-semibold">{favorites.length}</p>
            <p className="text-xs text-muted-foreground">Favorites</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <BookOpen className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-2xl font-semibold">{inProgressWorks.length}</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <Check className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-2xl font-semibold">{completedWorks.length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <Clock className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-2xl font-semibold">{notStartedWorks.length}</p>
            <p className="text-xs text-muted-foreground">Not Started</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="favorites" className="mt-10">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="gap-2">
              <BookOpen className="h-4 w-4" />
              In Progress ({inProgressWorks.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <Check className="h-4 w-4" />
              Completed ({completedWorks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="animate-fade-in space-y-3">
            {favoriteWorks.length > 0 ? (
              favoriteWorks.map((work) => work && <WorkListItem key={work.id} work={work} />)
            ) : (
              <EmptyState
                icon={Heart}
                message="No favorites yet"
                action={
                  <Link to="/archive" className="mt-4 inline-block text-primary hover:underline">
                    Browse works
                  </Link>
                }
              />
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="animate-fade-in space-y-3">
            {inProgressWorks.length > 0 ? (
              inProgressWorks.map((work) => work && <WorkListItem key={work.id} work={work} showProgress />)
            ) : (
              <EmptyState
                icon={BookOpen}
                message="No works in progress"
                action={
                  <Link to="/archive" className="mt-4 inline-block text-primary hover:underline">
                    Start reading
                  </Link>
                }
              />
            )}
          </TabsContent>

          <TabsContent value="completed" className="animate-fade-in space-y-3">
            {completedWorks.length > 0 ? (
              completedWorks.map((work) => work && <WorkListItem key={work.id} work={work} />)
            ) : (
              <EmptyState icon={Check} message="No completed works yet" />
            )}
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default ReadingList;
