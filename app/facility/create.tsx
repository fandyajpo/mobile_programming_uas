import { View } from "react-native";
import { tw } from "@/lib/tailwind";
import { CreateFacilityForm } from "@/components/form/CreateFacilityForm";

export default function CreateFacility() {
  return (
    <View style={tw`p-4`}>
      <CreateFacilityForm method="CREATE" />
    </View>
  );
}
