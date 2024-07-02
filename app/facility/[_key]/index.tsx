import { View } from "react-native";
import { CreateFacilityForm } from "@/components/form/CreateFacilityForm";
import { useFacilityById } from "@/query/tanstack/facility";
import { tw } from "@/lib/tailwind";
export default function FacilityById() {
  const { data, isPending } = useFacilityById();
  return (
    <View style={tw`p-4`}>
      {isPending ? null : <CreateFacilityForm method="UPDATE" data={data} />}
    </View>
  );
}
