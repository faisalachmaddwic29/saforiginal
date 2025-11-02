export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  color: string | null;
  order: number | null;
}

export type Categories = Category[];


export type CategoriesResponse = {
  categories: Categories
  message: string;
  status: number;
};
