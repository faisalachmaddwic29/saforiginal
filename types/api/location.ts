import type { Domicile } from "./domicile";

export interface Location {
  id: number;
  domicile: Domicile;
  text: string;
}