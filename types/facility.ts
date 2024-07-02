import { IAudit } from "./audit";
export interface IFacility extends IAudit {
  name: string;
  category: string;
  availableStock: number;
  stock: number;
}
