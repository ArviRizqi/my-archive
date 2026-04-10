import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ReadingProgress {
  work_id: string;
  progress: number;
  completed: boolean;
  last_read_at: string;
}

export const useReadingProgress = () => {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, ReadingProgress>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProgress();
    } else {
      setProgressMap({});
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('user_id', user.id);
    
    if (!error && data) {
      const map: Record<string, ReadingProgress> = {};
      data.forEach(p => {
        map[p.work_id] = p;
      });
      setProgressMap(map);
    }
    setLoading(false);
  };

  const updateProgress = async (workId: string, progress: number) => {
    if (!user) return;
    
    const completed = progress >= 100;
    
    const { error } = await supabase
      .from('reading_progress')
      .upsert({
        user_id: user.id,
        work_id: workId,
        progress,
        completed,
        last_read_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,work_id'
      });
    
    if (!error) {
      setProgressMap(prev => ({
        ...prev,
        [workId]: { work_id: workId, progress, completed, last_read_at: new Date().toISOString() }
      }));
    }
  };

  const markAsComplete = async (workId: string) => {
    await updateProgress(workId, 100);
  };

  const getProgress = (workId: string) => progressMap[workId]?.progress ?? 0;
  const isCompleted = (workId: string) => progressMap[workId]?.completed ?? false;
  const getCompletedCount = () => Object.values(progressMap).filter(p => p.completed).length;

  return { 
    progressMap, 
    loading, 
    updateProgress, 
    markAsComplete, 
    getProgress, 
    isCompleted,
    getCompletedCount
  };
};
