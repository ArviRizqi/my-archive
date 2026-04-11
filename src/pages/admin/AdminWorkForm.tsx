import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { value: 'poetry', label: 'Poetry' },
  { value: 'short-stories', label: 'Short Stories' },
  { value: 'prose', label: 'Prose' },
  { value: 'novels', label: 'Novels' },
];

const AdminWorkForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'poetry',
    genre: '',
    content: '',
    featured: false,
  });

  // Fetch existing work if editing
  const { data: work, isLoading } = useQuery({
    queryKey: ['admin-work', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isAdmin && isEditing,
  });

  useEffect(() => {
    if (work) {
      setFormData({
        title: work.title,
        author: work.author || '',
        category: work.category,
        genre: work.genre,
        content: work.content,
        featured: work.featured || false,
      });
    }
  }, [work]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (isEditing) {
        const { error } = await supabase
          .from('works')
          .update(data)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('works').insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-works'] });
      toast({ title: isEditing ? 'Work updated successfully' : 'Work created successfully' });
      navigate('/admin/works');
    },
    onError: (error) => {
      toast({
        title: 'Failed to save work',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, adminLoading, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (adminLoading || (isEditing && isLoading)) {
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
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/admin/works">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            {isEditing ? 'Edit Work' : 'Add New Work'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Enter author name"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="e.g., Reflective, Literary Fiction"
                required
              />
            </div>
          </div>



          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Full text of the work..."
              rows={15}
              className="font-serif"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, featured: checked as boolean })
              }
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured (show in homepage highlights)
            </Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={saveMutation.isPending}>
              <Save className="mr-2 h-4 w-4" />
              {saveMutation.isPending ? 'Saving...' : 'Save Work'}
            </Button>
            <Link to="/admin/works">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default AdminWorkForm;