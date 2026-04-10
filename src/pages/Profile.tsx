import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useUserFavorites } from '@/hooks/useUserFavorites';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { getWork, works } from '@/data/works';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { User, Heart, BookOpen, Settings, Loader2, Check } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const { user, profile, loading, updateProfile } = useAuth();
  const { favorites } = useUserFavorites();
  const { progressMap, getCompletedCount } = useReadingProgress();
  
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [updating, setUpdating] = useState(false);

  if (loading) {
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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    const { error } = await updateProfile({ display_name: displayName, bio });
    
    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated!');
    }
    setUpdating(false);
  };

  const favoriteWorks = favorites.map(id => getWork(id)).filter(Boolean);
  const readingStats = Object.values(progressMap);
  const completedCount = getCompletedCount();
  const inProgressCount = readingStats.filter(p => !p.completed && p.progress > 0).length;

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="animate-fade-in-up">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            Your Account
          </span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            {profile?.display_name || 'Reader'}
          </h1>
          <p className="mt-2 text-muted-foreground">{user.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <Card className="animate-fade-in-up delay-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-2xl font-semibold">{favorites.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in-up delay-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-2xl font-semibold">{completedCount}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in-up delay-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-2xl font-semibold">{inProgressCount}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in-up delay-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">{works.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="favorites" className="mt-10">
          <TabsList className="mb-6">
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Reading Progress
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="animate-fade-in">
            {favoriteWorks.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {favoriteWorks.map((work) => work && (
                  <Link
                    key={work.id}
                    to={`/work/${work.id}`}
                    className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary"
                  >
                    <h3 className="font-serif text-lg font-medium">{work.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {work.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No favorites yet</p>
                  <Link to="/" className="mt-4 inline-block text-primary hover:underline">
                    Browse works
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress" className="animate-fade-in">
            {readingStats.length > 0 ? (
              <div className="space-y-4">
                {readingStats.map((progress) => {
                  const work = getWork(progress.work_id);
                  if (!work) return null;
                  return (
                    <Link
                      key={progress.work_id}
                      to={`/work/${work.id}`}
                      className="block rounded-lg border border-border bg-card p-4 transition-all hover:border-primary"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg font-medium">{work.title}</h3>
                        {progress.completed && (
                          <span className="flex items-center gap-1 text-xs text-primary">
                            <Check className="h-3 w-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <Progress value={progress.progress} className="mt-3 h-2" />
                      <p className="mt-2 text-xs text-muted-foreground">
                        {progress.progress}% complete
                      </p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">Start reading to track progress</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your display name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" disabled={updating}>
                    {updating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default Profile;
