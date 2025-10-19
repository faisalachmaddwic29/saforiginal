export interface TicketUser {
  name: string;
  email: string;
  phone: string;
  sameAsRegistration?: boolean;
}



export interface TicketWithUsers {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
  price: number;
  users: TicketUser[];
  
}
