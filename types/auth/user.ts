export interface UserLocationDomicile {
  province_name: string;
  city_type: string;
  city_name: string;
}

export interface UserLocation {
  id: number;
  domicile: UserLocationDomicile;
  text: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: UserLocation;
  gender: string;
  avatar_url: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
}

export interface UserData {
  user: User;
}

export type UserResponse = UserData & {
  status: number;
  message: string;
}
