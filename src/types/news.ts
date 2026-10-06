export interface INews {
  id?: number;
  created_at?: string;
  title: string;
  content: string;
  category: string;
  author: string;
  isFavorite?: boolean;
}
