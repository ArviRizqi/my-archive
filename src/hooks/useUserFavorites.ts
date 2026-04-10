import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useUserFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('user_favorites')
      .select('work_id')
      .eq('user_id', user.id);
    
    if (!error && data) {
      setFavorites(data.map(f => f.work_id));
    }
    setLoading(false);
  };

  const toggleFavorite = async (workId: string) => {
    if (!user) {
      toast.error('Please sign in to save favorites');
      return;
    }

    const isFavorite = favorites.includes(workId);
    
    if (isFavorite) {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('work_id', workId);
      
      if (!error) {
        setFavorites(prev => prev.filter(id => id !== workId));
        toast.success('Removed from favorites');
      }
    } else {
      const { error } = await supabase
        .from('user_favorites')
        .insert({ user_id: user.id, work_id: workId });
      
      if (!error) {
        setFavorites(prev => [...prev, workId]);
        toast.success('Added to favorites');
      }
    }
  };

  const isFavorite = (workId: string) => favorites.includes(workId);

  return { favorites, loading, toggleFavorite, isFavorite };
};
