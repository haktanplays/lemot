import { Tabs } from "expo-router";
import {
  Mountain,
  MessageCircle,
  Shuffle,
  Layers,
  BarChart3,
} from "lucide-react-native";
import { P } from "@/constants/theme";

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
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="crossing"
        options={{
          title: "Crossing",
          tabBarIcon: ({ color, size }) => (
            <Shuffle color={color} size={size} />
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
