import { Tabs } from "expo-router";
import {
  Mountain,
  MessageCircle,
  Layers,
  BarChart3,
} from "lucide-react-native";
import { P } from "@/constants/theme";
import { FEATURES } from "@/config/productStage";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: P.red,
        tabBarInactiveTintColor: P.ink3,
        tabBarStyle: {
          backgroundColor: P.paper,
          borderTopColor: P.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Journey",
          tabBarIcon: ({ color, size }) => (
            <Mountain color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          // Hide tab in dev-apk (FEATURES.aiChat=false). The route file stays
          // mounted; it just doesn't appear in the bottom bar. Sandbox /
          // public-beta keep aiChat=true so the tab remains visible.
          href: FEATURES.aiChat ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarIcon: ({ color, size }) => (
            <Layers color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
