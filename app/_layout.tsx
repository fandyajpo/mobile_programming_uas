import "react-native-reanimated";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import TQuery from "@/components/provider/tQuery";
import { SheetProvider } from "react-native-actions-sheet";
import "@/components/sheet/index";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TQuery>
      <SheetProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="facility/index"
              options={{ title: "Facility", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="category/index"
              options={{ title: "Category", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="facility/create"
              options={{ title: "New Facility", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="facility/[_key]/index"
              options={{ title: "Update Facility", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="createBorrow/index"
              options={{ title: "Select Facility", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="createBorrow/[_key]/index"
              options={{
                title: "Request Form",
                headerBackTitle: "Back",
              }}
            />
          </Stack>
        </ThemeProvider>
      </SheetProvider>
    </TQuery>
  );
}
