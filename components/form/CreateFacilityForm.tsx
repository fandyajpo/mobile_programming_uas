import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { IFacility } from "@/types/facility";
import { tw } from "@/lib/tailwind";
import {
  useInsertFacility,
  useUpdateFacility,
} from "@/query/tanstack/facility";
import { TMethod } from "@/types/audit";

interface Props {
  data?: IFacility;
  method?: TMethod;
}

export function CreateFacilityForm(props: Props) {
  const { mutate: insert, isPending: insertPending } = useInsertFacility();
  const { mutate: update, isPending: updatePending } = useUpdateFacility();

  const isUpdate: boolean = props.method === "UPDATE";

  const { control, handleSubmit } = useForm<IFacility>({
    defaultValues: isUpdate ? { ...props?.data } : undefined,
  });
  const onSubmit = (data: IFacility) =>
    isUpdate ? update(data) : insert(data);

  return (
    <View style={tw`gap-2`}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <View>
            <Text style={tw`text-xs`}>Facility Name</Text>
            <TextInput
              ref={ref}
              placeholder="Facility Name"
              onBlur={onBlur}
              onChangeText={onChange}
              style={tw`border rounded p-2 border-gray-400`}
              value={value}
            />
          </View>
        )}
        name="name"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <View>
            <Text style={tw`text-xs`}>Facility Category</Text>
            <TextInput
              ref={ref}
              placeholder="Category"
              onBlur={onBlur}
              onChangeText={onChange}
              style={tw`border rounded p-2 border-gray-400`}
              value={value}
            />
          </View>
        )}
        name="category"
      />

      <Button
        title="Submit"
        disabled={updatePending || insertPending}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}
