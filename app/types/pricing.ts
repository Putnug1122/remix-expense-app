import type { IconType } from "react-icons";

export interface Pricing {
  id: string;
  title: string;
  price: string;
  perks: string[];
  icon: IconType;
}
