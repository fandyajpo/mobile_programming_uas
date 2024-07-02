import { IAudit } from "./audit";
export interface IBorrow extends IAudit {
  facility: string;

  nim: string;
  name: string;
  message: string;

  startDate: string;
  endDate: string;
}
