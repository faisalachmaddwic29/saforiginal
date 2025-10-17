import type { User } from "../auth";
import type { Attendee } from "./attendees";
import type { PaginateData } from "./base";
import type { OfflineTicket } from "./offline_ticket";
import type { Payment } from "./payments";
import type { Product } from "./product";

export type Gender = 'L' | 'P' | string;
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'expired' | string;


export interface TransactionDetail {
  id: number;
  name: string;
  product: Product;
  offline_ticket: OfflineTicket;
  quantity: number;
  price: string;
  total: string;
  attendees: Attendee[] | null;
}

// Transaksi utama
export interface Transaction {
  id: string;
  invoice_no: string;
  name: string;
  email: string;
  phone: string;
  location: Location;
  gender: Gender;
  payment_status: PaymentStatus;
  payment_name: string;
  total: string;
  tax: string;
  admin_fee: string;
  commission: string;
  discount: string | null;
  dpp: string | null;
  payment_fee: string;
  grand_total: string;
  payment: Payment | null;
  payment_qr_url: string | null;
  payment_qr_string: string | null;
  payment_bank: string | null;
  payment_bank_va: string | null;
  expired_at: string | null;
  user: User;
  details: TransactionDetail[];
}

export type Transactions = Transaction[];

export type TransactionResponse = {
  transaction: Transaction;
  message: string;
  status: number;
};

export type TransactionsResponse = PaginateData<Transaction, 'transactions'> & {
  message: string;
  status: number;
};

