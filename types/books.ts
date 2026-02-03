export type Book = {
  id: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
  description?: string;
  categories?: string[];
  rating?: number;
};