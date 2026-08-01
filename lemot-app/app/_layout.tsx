import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "@/providers/AppProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { LearningEngineProvider } from "@/providers/LearningEngineProvider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit: require("../assets/fonts/Outfit-Variable.ttf"),
    Newsreader: require("../assets/fonts/Newsreader-Italic-Variable.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppProvider>
        {/* Innermost of the three: the learning runtime needs neither auth nor
            legacy progress, but `AppProvider` owns the privacy reset that the
            runtime reacts to, so it must not sit above it. Mounted exactly once
            — no route re-provides it. */}
        <LearningEngineProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth" />
            <Stack.Screen
              name="lesson/[id]"
              options={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            />
          </Stack>
        </LearningEngineProvider>
      </AppProvider>
    </AuthProvider>
  );
}
