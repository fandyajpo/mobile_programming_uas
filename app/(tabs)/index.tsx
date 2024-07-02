import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import { Plus, Wallet } from "@/components/Icons";
import tw from "twrnc";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVIGATION_FEATURE = [
  {
    title: "Facility",
    href: "/facility",
    icon: <Wallet style={tw`w-10 h-10 text-blue-500`} />,
  },
  { title: "Category", href: "" },
  { title: "Archive", href: "" },
];

const DATA = [
  { name: "Ruangan" },
  { name: "Kendaraan" },
  { name: "Ruangan" },
  { name: "Ruangan" },
  { name: "Ruangan" },
  { name: "Ruangan" },
  { name: "Ruangan" },
];

export default function HomeScreen() {
  const renderedActivity = ({ item, index }: any) => {
    return (
      <View
        key={index?.toString()}
        style={tw`w-full h-24 border border-gray-300 rounded p-2`}
      >
        <Text>{item?.name}</Text>
      </View>
    );
  };
  const renderHorizontalItem = ({ item, index }: any) => (
    <View style={tw`gap-1`} key={index?.toString()}>
      <View
        style={tw`bg-white rounded border border-blue-500 bg-blue-200 w-24 h-24 flex items-center justify-center`}
      >
        <Link href={item?.href}>
          <View>{item?.icon}</View>
        </Link>
      </View>
      <Text style={tw`text-xs text-center`}>{item?.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw.style(`bg-white p-4`, { flex: 1 })}>
      <View
        style={tw.style("py-4", {
          flexDirection: "row",
          justifyContent: "space-between",
        })}
      >
        <View>
          <Text style={tw`font-bold text-xl`}>Facility</Text>
        </View>
        <Link href={"/facility/create"}>
          <Plus
            style={tw.style(
              `w-6 h-6 text-green-500 bg-white border border-green-400`,
              {
                borderRadius: 11,
              }
            )}
          />
        </Link>
      </View>

      <FlatList
        contentContainerStyle={tw`gap-2`}
        ListHeaderComponent={
          <>
            <ScrollView
              contentContainerStyle={tw`gap-2`}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {NAVIGATION_FEATURE.map((item, index) =>
                renderHorizontalItem({ item, index })
              )}
            </ScrollView>
            <View
              style={tw.style("py-4", {
                flexDirection: "row",
                justifyContent: "space-between",
              })}
            >
              <View>
                <Text style={tw`font-bold text-xl`}>Loan List</Text>
              </View>
              <Link href={"/createBorrow"}>
                <Plus
                  style={tw.style(
                    `w-6 h-6 text-green-500 bg-white border border-green-400`,
                    {
                      borderRadius: 11,
                    }
                  )}
                />
              </Link>
            </View>
          </>
        }
        style={{ flex: 1 }}
        data={DATA}
        renderItem={renderedActivity}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
