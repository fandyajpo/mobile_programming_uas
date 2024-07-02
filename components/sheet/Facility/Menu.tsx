import { useRef } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { Pressable, Text, View } from "react-native";
import { tw } from "@/lib/tailwind";
import { useRouter } from "expo-router";
export const FacilityMenu = (props: SheetProps<"facility_menu">) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const router = useRouter();
  return (
    <ActionSheet
      id="facility_menu"
      ref={actionSheetRef}
      animated
      closable
      closeOnPressBack
      containerStyle={tw`pt-4`}
    >
      <Text style={tw`p-4 font-semibold`}>{props.payload?.name}</Text>
      <Pressable
        onPress={() => {
          actionSheetRef.current?.hide();
          router.push(`/facility/${props.payload?._key}`);
        }}
        style={tw`w-full h-10 border-b border-gray-200 flex items-center justify-center`}
      >
        <Text>Update</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          return SheetManager.show("facility_delete", {
            payload: { _key: String(props.payload?._key) },
          });
        }}
        style={tw`w-full h-10 border-b border-gray-200 flex items-center justify-center`}
      >
        <Text>Remove</Text>
      </Pressable>

      <View style={tw`p-4`}>
        <Pressable
          onPress={() => actionSheetRef.current?.hide()}
          style={tw`rounded-md shadow bg-red-500 h-10 border-b border-gray-200 flex items-center justify-center`}
        >
          <Text style={tw`text-white`}>Close</Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
};
