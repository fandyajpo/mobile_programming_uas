import { View, Text, FlatList, Pressable } from "react-native";
import { tw } from "@/lib/tailwind";
import { Menu } from "@/components/Icons";
import { useInfiniteFacility } from "@/query/tanstack/facility";
import { SheetManager } from "react-native-actions-sheet";
export default function CreateBorrow() {
  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteFacility();

  const flattenData = data?.pages?.flatMap?.((page) => page?.data);

  const loadNextPageData = () => {
    if (hasNextPage && !isLoading) fetchNextPage();
  };

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item?._key}
        style={tw`w-full h-full`}
        renderItem={({ item }) => {
          return (
            <View
              key={item?.name}
              style={tw`p-4 border-b border-gray-200 flex w-full flex-row justify-between`}
            >
              <Text>{item?.name}</Text>
              <Pressable
                onPress={() =>
                  SheetManager.show("confirm_borrow", {
                    payload: item,
                  })
                }
              >
                <Menu style={tw`w-4 h-4`} />
              </Pressable>
            </View>
          );
        }}
        data={flattenData}
        onEndReached={loadNextPageData}
        onEndReachedThreshold={0.5}
      />
      {hasNextPage ? (
        <Pressable onPress={loadNextPageData}>
          <Text>Load more...</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
