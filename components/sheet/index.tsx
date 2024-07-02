import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { FacilityMenu } from "@/components/sheet/Facility/Menu";
import { FacilityDelete } from "@/components/sheet/Facility/Delete";
import { ConfirmBorrow } from "./CreateBorrow/ConfirmBorrow";
import { IFacility } from "@/types/facility";

registerSheet("facility_menu", FacilityMenu);
registerSheet("facility_delete", FacilityDelete);
registerSheet("confirm_borrow", ConfirmBorrow);

declare module "react-native-actions-sheet" {
  interface Sheets {
    facility_menu: SheetDefinition<{
      payload: IFacility;
    }>;
    facility_delete: SheetDefinition<{
      payload: {
        _key: string;
      };
    }>;
    confirm_borrow: SheetDefinition<{
      payload: IFacility;
    }>;
  }
}

export {};
