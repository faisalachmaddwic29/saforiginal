export interface OfflineTicket {
  id: number;
  name: string;
  description: string | null;
  onsale: boolean;
  price: string;
  price_sale: string;
  stock: number;
  limit: number;
  sold: number;
  is_active: boolean;
  order_index: number;
  available_stock: number;
}
