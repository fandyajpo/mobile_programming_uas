import { useRef } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { tw } from "@/lib/tailwind";
export const ConfirmBorrow = (props: SheetProps<"confirm_borrow">) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const router = useRouter();

  return (
    <ActionSheet
      id="confirm_borrow"
      ref={actionSheetRef}
      animated
      closable
      closeOnPressBack
      containerStyle={tw`pt-4`}
    >
      <Text style={tw`p-4`}>
        Hey, you want to select {props.payload?.name}?
      </Text>
      <View style={tw.style(`p-4 flex flex-row w-full gap-2`)}>
        <Pressable
          onPress={() => SheetManager.hide("confirm_borrow")}
          style={tw.style(
            `rounded-md shadow bg-red-500 flex items-center justify-center h-10 border-b w-auto border-gray-200`,
            { flex: 1 }
          )}
        >
          <Text style={tw`text-white`}>Cancel</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            SheetManager.hide("confirm_borrow");
            router.push(`/createBorrow/${props?.payload?._key}`);
          }}
          style={tw.style(
            `rounded-md shadow border flex items-center justify-center h-10 border-b w-full border-gray-200`,
            { flex: 1 }
          )}
        >
          <Text style={tw`text-gray-700`}>Yes pretty! 🥳</Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
};
