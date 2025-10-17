// Attendee (peserta event)
export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticket_code: string;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
  updated_at: string;
}
