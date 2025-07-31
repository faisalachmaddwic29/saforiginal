import type { PaginateData } from "./base";
import type { Category } from "./category";
import type { Creator } from "./creator";
import type { OfflineTicket } from "./offline_ticket";
import type { Store } from "./store";
import type { TagItem } from "./tag";
import type { Video } from "./video";


export enum ProductType {
  ONLINE_EVENT = 'online_event',
  OFFLINE_EVENT = 'offline_event',
  VIDEO_SERIES = 'video_series',
  BOOK = 'book',
  MERCHANDISE = 'merchandise'
}

export function toProductType(value: string): ProductType | null {
  const values = Object.values(ProductType);
  return values.includes(value as ProductType) ? (value as ProductType) : null;
}

export enum ProductDateFilter {
  ALL = 'all',
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  THIS_WEEK = 'this_week',
  THIS_MONTH = 'this_month',
  NEXT_MONTH = 'next_month'
}


export interface Product {
  id: number;
  type: string;
  status: string;
  commission_type: string | null;
  store: Store;
  location: Location | null;
  title: string;
  slug: string;
  btn_label: string;
  cover: string;
  description: string;
  excerpt: string;
  address: string | null;
  latlong: string | null;
  event_at: string;
  event_url: string | null;
  is_purchaseable: boolean;
  is_free: boolean;
  is_tax_enabled: boolean;
  price: string;
  price_sale: string | null;
  admin_fee: string;
  commission: string | null;
  onsale: boolean;
  closed_at: string | null;
  stock: number | null;
  limit: number | null;
  sold: number;
  media_type: string | null;
  availability_type: string | null;
  note: string | null;
  categories: Category[];
  tags: TagItem[];
  creator: Creator;
  updater: any; // bisa diganti sesuai kebutuhan
  videos: Video[];
  offline_tickets: OfflineTicket[];
  created_at: string;
  updated_at: string;
}

export type Products = Product[] | [];



export type ProductResponse = {
  product: Product
  message: string;
  status: number;
};


// Langsung response API
export type ProductsResponse = PaginateData<Product, 'products'> & {
  message: string;
  status: number;
};
