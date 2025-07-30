
export interface Creator {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  location: any; // bisa diganti kalau ada struktur
  gender: string;
  avatar_url: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
}