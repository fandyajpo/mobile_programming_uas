import { View, Text } from "react-native";
import { tw } from "@/lib/tailwind";
import { CreateBorrowForm } from "@/components/form/CreateBorrowForm";
import { useFacilityById } from "@/query/tanstack/facility";
const CreateBorrowConfirmation = () => {
  const { data, isPending } = useFacilityById();

  return (
    <View style={tw`p-4`}>
      {isPending ? null : (
        <View
          style={tw`border p-2 rounded border-gray-300 shadow flex flex-row gap-4`}
        >
          <View
            style={tw`w-14 h-14 rounded bg-gray-200 border border-gray-200 shadow`}
          />
          <View>
            <Text>{data?.name}</Text>
            <Text>{data?.category}</Text>
          </View>
        </View>
      )}
      <Text style={tw`py-2`}>
        Please fill out the form below to make a request
      </Text>

      <CreateBorrowForm />
    </View>
  );
};

export default CreateBorrowConfirmation;
