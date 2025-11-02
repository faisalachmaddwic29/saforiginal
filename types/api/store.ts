import type { Company } from "./company";

export interface Store {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  company: Company;
}