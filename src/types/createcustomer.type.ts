import { COUNTRIES } from "../data/Salesportal.countries.enum";

export interface CustomerBody {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes: string;
}
