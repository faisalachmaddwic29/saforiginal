import type { Location } from "./location"

export interface CartDetail {
  id: string | number // bisa UUID atau ID integer
  name: string
  quantity: number
  price: number
  total: number
}

export interface Cart {
  name: string;
  email: string;
  phone: string;
  location_id: number | string;
  location: Location;
  gender: 'L' | 'P' | string // fleksibel kalau nanti ada opsi lain
  total: number;
  voucher_code: string;
  discount: number;
  dpp: number;
  tax: number;
  admin_fee: number;
  commision: number;
  payment_fee: number;
  grand_total: number;
  details: CartDetail[];
}

export type Carts = Cart[];

export type CartResponse = {
  cart: Cart;
  message: string;
  status: number;
}
