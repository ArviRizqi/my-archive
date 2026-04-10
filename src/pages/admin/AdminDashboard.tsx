import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Mail, 
  Users, 
  LogOut,
  Plus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading } = useAdmin();

  // Fetch stats
  const { data: worksCount } = useQuery({
    queryKey: ['admin-works-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('works')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
    enabled: isAdmin,
  });

  const { data: messagesCount } = useQuery({
    queryKey: ['admin-messages-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      return count || 0;
    },
    enabled: isAdmin,
  });

  const { data: subscribersCount } = useQuery({
    queryKey: ['admin-subscribers-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      return count || 0;
    },
    enabled: isAdmin,
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your literary archive
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{worksCount ?? 0}</p>
                <p className="text-sm text-muted-foreground">Published Works</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{messagesCount ?? 0}</p>
                <p className="text-sm text-muted-foreground">Unread Messages</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{subscribersCount ?? 0}</p>
                <p className="text-sm text-muted-foreground">Newsletter Subscribers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            to="/admin/works"
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <BookOpen className="mb-4 h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground group-hover:text-primary">
              Manage Works
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add, edit, or delete literary works
            </p>
          </Link>

          <Link
            to="/admin/messages"
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <Mail className="mb-4 h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground group-hover:text-primary">
              View Messages
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Read contact form submissions
            </p>
          </Link>

          <Link
            to="/admin/subscribers"
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <Users className="mb-4 h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground group-hover:text-primary">
              Newsletter Subscribers
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your subscriber list
            </p>
          </Link>
        </div>

        {/* Quick Add */}
        <div className="mt-8">
          <Link to="/admin/works/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Work
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;