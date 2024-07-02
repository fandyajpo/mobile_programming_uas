import { useRef } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { Pressable, Text, View } from "react-native";
import { tw } from "@/lib/tailwind";
import { useRemoveFacility } from "@/query/tanstack/facility";
export const FacilityDelete = (props: SheetProps<"facility_delete">) => {
  const { mutate } = useRemoveFacility();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <ActionSheet
      id="facility_delete"
      ref={actionSheetRef}
      animated
      closable
      closeOnPressBack
      containerStyle={tw`pt-4`}
    >
      <View style={tw.style(`p-4 flex flex-row w-full gap-2`)}>
        <Pressable
          onPress={() => SheetManager.hide("facility_menu")}
          style={tw.style(
            `rounded-md shadow bg-blue-500 flex items-center justify-center h-10 border-b w-auto border-gray-200`,
            { flex: 1 }
          )}
        >
          <Text style={tw`text-white`}>Cancel</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            SheetManager.hide("facility_menu");
            return mutate(String(props.payload?._key));
          }}
          style={tw.style(
            `rounded-md shadow bg-red-500 flex items-center justify-center h-10 border-b w-full border-gray-200`,
            { flex: 1 }
          )}
        >
          <Text style={tw`text-white`}>Close</Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
};
