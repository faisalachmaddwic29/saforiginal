export interface TagItem {
  id: number;
  name: string;
  slug: string;
  type: string | null;
  order_column: number;
}

export type Tags = TagItem[];


export interface TagsResponse {
  tags: Tags;
  message: string;
  status: boolean | number;
}