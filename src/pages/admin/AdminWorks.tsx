import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  ArrowLeft, 
  Edit, 
  Trash2,
  Star
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const AdminWorks = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdmin();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: works, isLoading } = useQuery({
    queryKey: ['admin-works'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('works').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-works'] });
      toast({ title: 'Work deleted successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Failed to delete work', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, loading, navigate]);

  if (loading || !isAdmin) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                Manage Works
              </h1>
              <p className="mt-1 text-muted-foreground">
                {works?.length || 0} works in the archive
              </p>
            </div>
          </div>
          <Link to="/admin/works/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Work
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading works...</p>
        ) : works && works.length > 0 ? (
          <div className="space-y-4">
            {works.map((work) => (
              <div
                key={work.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{work.title}</h3>
                    {work.featured && (
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {work.category} • {work.genre} • {new Date(work.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/works/${work.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this work?')) {
                        deleteMutation.mutate(work.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No works yet. Add your first work!</p>
            <Link to="/admin/works/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add New Work
              </Button>
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default AdminWorks;