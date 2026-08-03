import { Tabs } from "expo-router";
import { Mountain, BookMarked, Layers } from "lucide-react-native";
import { P } from "@/constants/theme";

/**
 * The three permanent learner-facing surfaces.
 *
 * Journey, Mon Lexique and Practice are always reachable — nothing the learner
 * has built is allowed to live behind a one-time completion screen. There is no
 * fourth tab: the learning summary is a header action inside Mon Lexique.
 *
 * Route files keep their engineering names (`mon-lexique`, `practice-hub`);
 * only the `title` is learner-facing, so no route rename risk is taken here.
 *
 * The legacy `chat` / `practice` / `stats` route files stay mounted but are
 * permanently absent from the bar (`href: null`). They render frozen legacy
 * surfaces (AI chat, SRS scenario cards, the 24-lesson syllabus table) that are
 * not part of the learner product shell, and "Stats" / "Practice Hub" are not
 * words the learner ever sees.
 *
 * The tab bar only exists inside this group. Lesson Zero (`/lesson-zero`), the
 * lesson routes (`/v1-lesson/[id]`, `/lesson/[id]`) and the learning summary
 * (`/learning-stats`) all live on the root stack above it, so an active lesson
 * never renders the bar.
 */
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
        name="mon-lexique"
        options={{
          title: "Mon Lexique",
          tabBarIcon: ({ color, size }) => (
            <BookMarked color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice-hub"
        options={{
          title: "Practice",
          tabBarIcon: ({ color, size }) => <Layers color={color} size={size} />,
        }}
      />

      {/* Frozen legacy routes — mounted, never in the bar. */}
      <Tabs.Screen name="chat" options={{ href: null }} />
      <Tabs.Screen name="practice" options={{ href: null }} />
      <Tabs.Screen name="stats" options={{ href: null }} />
    </Tabs>
  );
}
