import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/contexts/AuthContext';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();

  useEffect(() => {
    if (!adminLoading && isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, adminLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      // Check if user is admin after login
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        const { data: roleData, error: roleError } = await supabase
          .from('profiles')
          .select('user_roles')
          .eq('id', userData.user.id)
          .maybeSingle();

        if (roleError) {
          console.error("Database error when checking user role:", roleError);
          toast({
            title: 'Error checking role',
            description: roleError.message,
            variant: 'destructive',
          });
          await supabase.auth.signOut();
        } else if (roleData && roleData.user_roles === 'admin') {
          toast({
            title: 'Welcome back!',
            description: 'You are now logged in as admin.',
          });
          navigate('/admin');
        } else {
          toast({
            title: 'Access denied',
            description: 'You do not have admin privileges. Please ensure your user account is assigned the admin role in the database.',
            variant: 'destructive',
          });
          await supabase.auth.signOut();
        }
      }
    }
    setLoading(false);
  };

  if (adminLoading) {
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
      <section className="mx-auto max-w-md px-6 py-16 md:py-24">
        <div className="rounded-lg border border-border bg-card p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;