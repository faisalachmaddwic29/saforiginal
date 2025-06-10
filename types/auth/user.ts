export interface TypeLocation {
  id: number;
  domicile: {
    province_name: string;
    city_type: string;
    city_name: string;
  };
	text?: string;
  subdistrict?: string; // Optional field if it exists
}

export interface TypeUser {
  avatar_url: string;
  email: string;
  email_verified_at: string | null;
  gender: "L" | "P"; // Assuming "L" for male and "P" for female
  id: number;
  location: TypeLocation;
  name: string;
  phone: string;
  phone_verified_at: string | null;
}
