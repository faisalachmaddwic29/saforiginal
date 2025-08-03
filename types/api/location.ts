import type { Domicile } from "./domicile";

export interface Location {
  id: number;
  domicile: Domicile | null;
  text: string | null;
}

export type Locations = Location[];


export type LocationsResponse = {
  locations: Locations
  message: string;
  status: number;
};

