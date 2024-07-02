import { Text, View, TextInput, Button, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { tw } from "@/lib/tailwind";

import DatePicker from "react-native-date-picker";
import { TMethod } from "@/types/audit";
import { IBorrow } from "@/types/borrow";
import { useState } from "react";

interface Props {
  data?: IBorrow;
  method?: TMethod;
}

const DatePick = (props: typeof DatePicker) => {
  const [open, setOpen] = useState(false);

  return <>{}</>;
};

export function CreateBorrowForm(props: Props) {
  const [open, setOpen] = useState(false);
  const isUpdate: boolean = props.method === "UPDATE";

  const { control, handleSubmit, watch } = useForm<IBorrow>({
    defaultValues: {},
  });
  const onSubmit = (data: IBorrow) => {
    console.log(data);
  };

  return (
    <View style={tw`gap-2`}>
      <Text>{JSON.stringify(watch(), null, 2)}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <View>
            <Text style={tw`text-xs`}>Your Name</Text>
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
            <Text style={tw`text-xs`}>NIM / NIP</Text>
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
        name="nim"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <View>
            <Text style={tw`text-xs`}>Additional Message</Text>
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
        name="message"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <View>
            <Pressable onPress={() => setOpen(true)}>
              <Text>Pick Start Date</Text>
            </Pressable>
            <DatePicker
              ref={ref}
              modal
              mode="date"
              open={open}
              date={new Date()}
              onCancel={() => setOpen(false)}
              onConfirm={(a) => {
                onChange(a.toISOString());
                setOpen(false);
              }}
            />
          </View>
        )}
        name="startDate"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
