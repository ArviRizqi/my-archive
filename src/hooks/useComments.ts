import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Comment {
  id: string;
  user_id: string;
  work_id: string;
  content: string;
  created_at: string;
  profile?: {
    display_name: string | null;
    avatar_url: string | null;
  };
}

export const useComments = (workId: string) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [workId]);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profile:profiles!comments_user_id_fkey(display_name, avatar_url)
      `)
      .eq('work_id', workId)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setComments(data.map(c => ({
        ...c,
        profile: Array.isArray(c.profile) ? c.profile[0] : c.profile
      })));
    }
    setLoading(false);
  };

  const addComment = async (content: string) => {
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({ user_id: user.id, work_id: workId, content })
      .select(`
        *,
        profile:profiles!comments_user_id_fkey(display_name, avatar_url)
      `)
      .single();
    
    if (error) {
      toast.error('Failed to add comment');
      return;
    }

    setComments(prev => [{
      ...data,
      profile: Array.isArray(data.profile) ? data.profile[0] : data.profile
    }, ...prev]);
    toast.success('Comment added!');
  };

  const deleteComment = async (commentId: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    
    if (!error) {
      setComments(prev => prev.filter(c => c.id !== commentId));
      toast.success('Comment deleted');
    }
  };

  return { comments, loading, addComment, deleteComment };
};
