export interface INews {
  id?: number;
  created_at?: Date;
  title: string;
  content: string;
  category: string;
  author: string;
  isFavorite?: boolean;
  categorySlug?: string;
}
