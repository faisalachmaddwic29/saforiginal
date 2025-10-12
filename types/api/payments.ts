export interface Payment {
  id: number;
  name: string;
  image: string;
  payment_method: string; // bisa dibuat union type kalau mau lebih ketat
  type: string;
  is_active: boolean;
}

export type Payments = Payment[];

export type PaymentsResponse = {
	payments: Payments;
	message: string;
	status: number;
};
