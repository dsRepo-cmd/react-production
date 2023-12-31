import { Country } from "@/entities/Coutnry";
import { Currency } from "@/entities/Currency";

export interface Profile {
  id?: string;
  first?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  email?: string;
  username?: string;
  avatar?: string;
}
