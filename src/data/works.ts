export type Category = 'puisi' | 'cerpen' | 'prosa' | 'kutipan' ;

export interface Work {
  id: string;
  title: string;
  category: Category;
  genre: string;
  author?: string;
  content: string;
  date: string;
  featured?: boolean;
}


export const categoryLabels: Record<Category, string> = {
  'puisi': 'Puisi',
  'cerpen': 'Cerpen',
  'prosa': 'Prosa',
  'kutipan': 'Kutipan',
};
