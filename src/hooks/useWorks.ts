import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Category = 'poetry' | 'short-stories' | 'prose' | 'novels';

export const categoryLabels: Record<Category, string> = {
  'poetry': 'Poetry',
  'short-stories': 'Short Stories',
  'prose': 'Prose',
  'novels': 'Novels',
};

export type Work = Database['public']['Tables']['works']['Row'];

export const useWorks = () => {
  return useQuery({
    queryKey: ['works'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useWork = (id: string | undefined) => {
  return useQuery({
    queryKey: ['work', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('id', id)
        .single();
      if (error && error.code !== 'PGRST116') throw error; // Ignore not found error
      return data;
    },
    enabled: !!id,
  });
};

export const useFeaturedWorks = () => {
  return useQuery({
    queryKey: ['featured-works'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useCategoryWorks = (category: string | undefined) => {
  return useQuery({
    queryKey: ['category-works', category],
    queryFn: async () => {
      if (!category) return [];
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!category,
  });
};

export const useWorksByIds = (ids: string[]) => {
  return useQuery({
    queryKey: ['works-by-ids', ids],
    queryFn: async () => {
      if (!ids || ids.length === 0) return [];
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .in('id', ids)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: ids.length > 0,
  });
};
