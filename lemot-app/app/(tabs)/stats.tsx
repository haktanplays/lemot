import { useMemo } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BarChart3,
  Flame,
  Zap,
  Star,
  AlertTriangle,
  BookOpen,
  Check,
} from "lucide-react-native";
import { P } from "@/constants/theme";
import { useApp } from "@/providers/AppProvider";
import { LESSONS } from "@/data/lessons";
import { MILESTONES } from "@/data/milestones";
import { SECS } from "@/constants/sections";

export default function StatsScreen() {
  const { xp, prog, streak, errors, weakSpots, dailyRev, loaded } = useApp();

  /* ── Derived stats ── */
  const totalSections = LESSONS.length * SECS.length; // 16 * 11 = 176
  const completedSections = useMemo(
    () => Object.values(prog).filter(Boolean).length,
    [prog]
  );
  const completedLessons = useMemo(() => {
    return LESSONS.filter((l) =>
      SECS.every((s) => prog[`${l.id}-${s}`])
    ).length;
  }, [prog]);

  /* Word mastery from errors */
  const masteredWords = useMemo(() => {
    const wordMap = new Map<string, number>();
    errors.forEach((e) => {
      wordMap.set(e.w, (wordMap.get(e.w) || 0) + 1);
    });
    return { total: wordMap.size, weak: weakSpots.length };
  }, [errors, weakSpots]);

  /* Milestone progress */
  const milestoneProgress = useMemo(() => {
    return MILESTONES.map((m) => {
      const done = m.ids.every((id) =>
        SECS.every((s) => prog[`${id}-${s}`])
      );
      const partial = m.ids.filter((id) =>
        SECS.some((s) => prog[`${id}-${s}`])
      ).length;
      return { ...m, done, partial };
    });
  }, [prog]);

  /* Per-lesson progress */
  const lessonProgress = useMemo(() => {
    return LESSONS.map((l) => {
      const done = SECS.filter((s) => prog[`${l.id}-${s}`]).length;
      return { id: l.id, title: l.title, done, total: SECS.length };
    });
  }, [prog]);

  if (!loaded) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <ActivityIndicator size="small" color={P.red} />
      </SafeAreaView>
    );
  }

  /* ── Level from XP ── */
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View className="items-center mb-5">
          <BarChart3 color={P.red} size={28} strokeWidth={1.2} />
          <Text
            className="font-newsreader text-xl font-bold mt-1.5"
            style={{ fontStyle: "italic", color: P.ink }}
          >
            Tes progrès
          </Text>
        </View>

        {/* ── XP + Level Card ── */}
        <View
          className="rounded-xl px-4 py-4 mb-3"
          style={{
            backgroundColor: P.paper,
            borderWidth: 1,
            borderColor: P.border,
          }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center" style={{ gap: 8 }}>
              <View
                className="items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: P.red + "15",
                }}
              >
                <Zap size={18} color={P.red} />
              </View>
              <View>
                <Text className="text-lg font-bold" style={{ color: P.ink }}>
                  {xp} XP
                </Text>
                <Text className="text-[10px]" style={{ color: P.ink3 }}>
                  Level {level}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center" style={{ gap: 8 }}>
              <View
                className="items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: P.amber + "15",
                }}
              >
                <Flame size={18} color={P.amber} />
              </View>
              <View>
                <Text className="text-lg font-bold" style={{ color: P.ink }}>
                  {streak}
                </Text>
                <Text className="text-[10px]" style={{ color: P.ink3 }}>
                  Day streak
                </Text>
              </View>
            </View>
          </View>

          {/* XP progress bar */}
          <View className="mb-1">
            <View className="flex-row justify-between mb-1">
              <Text className="text-[10px]" style={{ color: P.ink3 }}>
                Level {level}
              </Text>
              <Text className="text-[10px]" style={{ color: P.ink3 }}>
                {xpInLevel}/100 XP
              </Text>
            </View>
            <View
              className="rounded-full overflow-hidden"
              style={{ height: 6, backgroundColor: P.border }}
            >
              <View
                className="rounded-full"
                style={{
                  height: 6,
                  width: `${xpInLevel}%`,
                  backgroundColor: P.red,
                }}
              />
            </View>
          </View>
        </View>

        {/* ── Overview Stats ── */}
        <View className="flex-row mb-3" style={{ gap: 8 }}>
          <StatBox
            icon={<BookOpen size={16} color={P.green} />}
            value={`${completedLessons}/16`}
            label="Lessons done"
            bg={P.green + "12"}
          />
          <StatBox
            icon={<Check size={16} color={P.purple} />}
            value={`${completedSections}`}
            label={`of ${totalSections} sections`}
            bg={P.purple + "12"}
          />
          <StatBox
            icon={<AlertTriangle size={16} color={P.amber} />}
            value={`${weakSpots.length}`}
            label="Weak words"
            bg={P.amber + "12"}
          />
        </View>

        {/* ── Daily Review ── */}
        <View
          className="rounded-xl px-4 py-3 mb-3"
          style={{
            backgroundColor: P.paper,
            borderWidth: 1,
            borderColor: P.border,
          }}
        >
          <Text className="text-xs font-bold mb-2" style={{ color: P.ink, letterSpacing: 0.5 }}>
            Today's Review
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm" style={{ color: P.ink2 }}>
              Words reviewed today
            </Text>
            <Text className="text-sm font-bold" style={{ color: P.green }}>
              {dailyRev.count} / 5
            </Text>
          </View>
          <View
            className="rounded-full overflow-hidden mt-2"
            style={{ height: 4, backgroundColor: P.border }}
          >
            <View
              className="rounded-full"
              style={{
                height: 4,
                width: `${Math.min((dailyRev.count / 5) * 100, 100)}%`,
                backgroundColor: P.green,
              }}
            />
          </View>
        </View>

        {/* ── Milestones ── */}
        <Text
          className="text-xs font-bold mt-2 mb-2"
          style={{ color: P.ink3, letterSpacing: 1, textTransform: "uppercase" }}
        >
          Milestones
        </Text>
        {milestoneProgress.map((m, i) => (
          <View
            key={i}
            className="flex-row items-center rounded-xl mb-1.5 px-3.5 py-3"
            style={{
              backgroundColor: m.done ? P.green + "10" : P.paper,
              borderWidth: 1,
              borderColor: m.done ? P.green + "30" : P.border,
              gap: 10,
            }}
          >
            <Text className="text-lg">{m.icon}</Text>
            <View className="flex-1">
              <Text
                className="text-[13px] font-bold"
                style={{ color: m.done ? P.green : P.ink }}
              >
                {m.title}
              </Text>
              <Text className="text-[10px]" style={{ color: P.ink3 }}>
                {m.done
                  ? "Completed!"
                  : `${m.partial} of ${m.ids.length} lessons started`}
              </Text>
            </View>
            {m.done && <Check size={16} color={P.green} />}
          </View>
        ))}

        {/* ── Weak Spots ── */}
        <Text
          className="text-xs font-bold mt-3 mb-2"
          style={{ color: P.ink3, letterSpacing: 1, textTransform: "uppercase" }}
        >
          Weak Spots
        </Text>
        {weakSpots.length > 0 ? (
          <View
            className="rounded-xl px-4 py-3 mb-1"
            style={{
              backgroundColor: P.amber + "08",
              borderWidth: 1,
              borderColor: P.amber + "25",
            }}
          >
            {weakSpots.slice(0, 8).map((ws, i) => (
              <View
                key={i}
                className="flex-row items-center justify-between py-1.5"
                style={
                  i < Math.min(weakSpots.length, 8) - 1
                    ? { borderBottomWidth: 1, borderBottomColor: P.amber + "15" }
                    : {}
                }
              >
                <Text
                  className="font-newsreader text-sm font-bold"
                  style={{ fontStyle: "italic", color: P.ink }}
                >
                  {ws.word}
                </Text>
                <Text className="text-[10px]" style={{ color: P.amber }}>
                  {ws.count} errors
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View
            className="rounded-xl px-4 py-3 mb-1"
            style={{
              backgroundColor: P.green + "10",
              borderWidth: 1,
              borderColor: P.green + "25",
            }}
          >
            <Text className="text-sm text-center" style={{ color: P.green }}>
              No weak spots yet — keep up the great work!
            </Text>
          </View>
        )}

        {/* ── Lesson Progress Table ── */}
        <Text
          className="text-xs font-bold mt-3 mb-2"
          style={{ color: P.ink3, letterSpacing: 1, textTransform: "uppercase" }}
        >
          Lesson Progress
        </Text>
        <View
          className="rounded-xl overflow-hidden mb-4"
          style={{
            backgroundColor: P.paper,
            borderWidth: 1,
            borderColor: P.border,
          }}
        >
          {lessonProgress.map((lp, i) => {
            const pct = Math.round((lp.done / lp.total) * 100);
            const isComplete = lp.done === lp.total;
            return (
              <View
                key={lp.id}
                className="flex-row items-center px-3.5 py-2.5"
                style={
                  i < lessonProgress.length - 1
                    ? { borderBottomWidth: 1, borderBottomColor: P.border }
                    : {}
                }
              >
                <View
                  className="items-center justify-center mr-2.5"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    backgroundColor: isComplete ? P.green + "15" : P.border + "80",
                  }}
                >
                  <Text
                    className="text-[10px] font-bold"
                    style={{ color: isComplete ? P.green : P.ink3 }}
                  >
                    {lp.id}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: P.ink }}
                    numberOfLines={1}
                  >
                    {lp.title}
                  </Text>
                  <View className="flex-row items-center mt-1" style={{ gap: 6 }}>
                    <View
                      className="flex-1 rounded-full overflow-hidden"
                      style={{ height: 3, backgroundColor: P.border }}
                    >
                      <View
                        className="rounded-full"
                        style={{
                          height: 3,
                          width: `${pct}%`,
                          backgroundColor: isComplete ? P.green : P.red,
                        }}
                      />
                    </View>
                    <Text className="text-[9px]" style={{ color: P.ink3 }}>
                      {lp.done}/{lp.total}
                    </Text>
                  </View>
                </View>
                {isComplete && (
                  <Star size={12} color={P.green} fill={P.green} className="ml-2" />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Small stat box component ── */
function StatBox({
  icon,
  value,
  label,
  bg,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  bg: string;
}) {
  return (
    <View
      className="flex-1 rounded-xl items-center py-3"
      style={{
        backgroundColor: P.paper,
        borderWidth: 1,
        borderColor: P.border,
      }}
    >
      <View
        className="items-center justify-center mb-1.5"
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          backgroundColor: bg,
        }}
      >
        {icon}
      </View>
      <Text className="text-sm font-bold" style={{ color: P.ink }}>
        {value}
      </Text>
      <Text className="text-[9px]" style={{ color: P.ink3 }}>
        {label}
      </Text>
    </View>
  );
}
