import { View, Text, FlatList } from "react-native";
import { tw } from "@/lib/tailwind";
import { useFacility, useInfiniteFacility } from "@/query/tanstack/facility";
import { FlashList } from "@shopify/flash-list";
export default function CategoryScreen() {
  // const {  } = useInfiniteFacility();

  return (
    <View>
      {/* <FlatList
        style={tw`w-full h-full`}
        renderItem={({ item }) => {
          return (
            <View key={item?.name}>
              <Text>{item?.name}</Text>
            </View>
          );
        }}
        data={data?.data}
      /> */}

      {/* <Text style={tw`text-black`}>csa{JSON.stringify(data, null, 2)}</Text> */}
    </View>
  );
}
