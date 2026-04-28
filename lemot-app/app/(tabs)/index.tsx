import { useState, useCallback } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator, Modal, Image } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Target, Lock, User } from "lucide-react-native";
import { useApp } from "@/providers/AppProvider";
import { useAuthContext } from "@/providers/AuthProvider";
import { LESSONS } from "@/data/lessons";
import { MILESTONES, FREE_LESSON_IDS } from "@/data/milestones";
import { MOTIV, P } from "@/constants/theme";
import { SECS } from "@/constants/sections";
import { getJourneyImage, getJourneyPhase } from "@/constants/journey";
import { LessonCard } from "@/components/LessonCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { Btn } from "@/components/Btn";
import type { ReviewQuestion } from "@/components/DailyReviewOverlay";
import {
  DailyReviewOverlay,
  genReviewItems,
} from "@/components/DailyReviewOverlay";

export default function HomeScreen() {
  const { lp, dailyRev, setDailyRev, save, prog, xp, errors, weakSpots, loaded } =
    useApp();
  const { user, signOut } = useAuthContext();

  // Account modal state
  const [showAccount, setShowAccount] = useState(false);

  // Daily review state
  const [showDR, setShowDR] = useState(false);
  const [drIdx, setDrIdx] = useState(0);
  const [drAns, setDrAns] = useState<string | null>(null);
  const [drItems, setDrItems] = useState<ReviewQuestion[]>([]);

  if (!loaded) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <ActivityIndicator size="small" color={P.red} />
      </SafeAreaView>
    );
  }

  const today = () => new Date().toISOString().slice(0, 10);
  const drCount = dailyRev.date === today() ? dailyRev.count : 0;
  const todayDone = drCount >= 5;

  const startDailyReview = () => {
    const remaining = 5 - drCount;
    if (remaining <= 0) return;
    const items = genReviewItems(remaining, weakSpots);
    if (items.length === 0) return;
    setDrItems(items);
    setDrIdx(0);
    setDrAns(null);
    setShowDR(true);
  };

  const handleDrNext = () => {
    const newCount = drCount + 1;
    const newDr = { date: today(), count: newCount };
    setDailyRev(newDr);
    if (drIdx >= drItems.length - 1) {
      save(prog, xp, errors, newDr);
      setShowDR(false);
      setDrIdx(0);
      setDrAns(null);
    } else {
      setDrIdx(drIdx + 1);
      setDrAns(null);
      save(prog, xp, errors, newDr);
    }
  };

  const goToLesson = (id: number) => {
    router.push(`/lesson/${id}`);
  };

  // Milestones
  const earnedMilestones = MILESTONES.filter((m) =>
    m.ids.every((id) => lp(id) === SECS.length)
  );

  // Journey image — based on highest completed lesson
  const highestLesson = LESSONS.reduce(
    (max, l) => (lp(l.id) > 0 && l.id > max ? l.id : max),
    0
  );
  const journeyPhase = getJourneyPhase(highestLesson);
  const journeyImage = getJourneyImage(highestLesson);

  // Daily quote
  const quote = MOTIV[Math.floor(Date.now() / 86400000) % MOTIV.length];

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <ScrollView className="flex-1 px-5" decelerationRate="normal">
        {/* Header */}
        <View className="pt-6 pb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold text-lm-ink tracking-tight">
              LE MOT
            </Text>
            <Text className="text-sm text-lm-ink2 mt-1">
              Your French learning journey
            </Text>
          </View>
          <Pressable
            onPress={() => {
              if (user) {
                setShowAccount(true);
              } else {
                router.push("/auth");
              }
            }}
            className="flex-row items-center gap-2 px-3 py-2 rounded-xl bg-lm-paper border border-lm-border"
          >
            <User size={16} color={user ? P.green : P.ink3} />
            <Text className="text-xs font-semibold" style={{ color: user ? P.green : P.ink3 }}>
              {user ? (user.user_metadata?.display_name ?? "Account") : "Sign In"}
            </Text>
          </Pressable>
        </View>

        {/* Journey Image */}
        <View className="bg-lm-paper rounded-2xl mb-4 border border-lm-border overflow-hidden">
          <Image
            source={journeyImage}
            className="w-full"
            style={{ height: 200 }}
            resizeMode="contain"
          />
          <View className="px-4 py-2.5">
            <Text className="text-xs font-semibold" style={{ color: P.ink }}>
              {journeyPhase.label}
            </Text>
            <Text className="text-[10px]" style={{ color: P.ink3 }}>
              {journeyPhase.subtitle}
            </Text>
          </View>
        </View>

        {/* Motivational quote */}
        <View
          className="mb-5 rounded-r-xl py-3 px-4"
          style={{
            backgroundColor: P.rl,
            borderLeftWidth: 2,
            borderLeftColor: P.red + "22",
          }}
        >
          <Text
            className="text-sm text-lm-ink2 italic leading-6"
            style={{ fontFamily: "serif" }}
          >
            "{quote}"
          </Text>
        </View>

        {/* Daily Review */}
        <View
          className="bg-lm-paper rounded-xl p-4 mb-4 border"
          style={{
            borderColor: todayDone ? P.green + "35" : P.red + "35",
          }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <Target size={18} color={todayDone ? P.green : P.red} />
              <Text className="text-sm font-bold text-lm-ink">
                Daily Review
              </Text>
            </View>
          </View>

          {/* Progress bar */}
          <View className="h-2 rounded-full bg-lm-border overflow-hidden mb-2">
            <View
              className="h-full rounded-full"
              style={{
                width: `${(drCount / 5) * 100}%`,
                backgroundColor: todayDone ? P.green : P.red,
              }}
            />
          </View>
          <Text className="text-xs text-lm-ink3 mb-2">
            {drCount} / 5 words reviewed today
          </Text>

          {!todayDone && (
            <Btn onPress={startDailyReview}>
              <Text className="text-white text-sm font-semibold">
                Start Review
              </Text>
            </Btn>
          )}
          {todayDone && (
            <Text className="text-xs text-lm-green font-semibold">
              Goal complete! Come back tomorrow.
            </Text>
          )}
        </View>

        {/* Milestones */}
        {earnedMilestones.length > 0 && (
          <View className="mb-4">
            <Text className="text-sm font-bold text-lm-ink mb-2">
              Milestones
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {earnedMilestones.map((m, i) => (
                <MilestoneCard key={i} milestone={m} earned />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Lessons */}
        <Text className="text-lg font-bold text-lm-ink mb-3">Lessons</Text>
        {LESSONS.map((lesson) => {
          const isFree = FREE_LESSON_IDS.includes(lesson.id);
          const isLocked = __DEV__ ? false : !isFree; // DEV: all unlocked
          return (
            <View key={lesson.id}>
              {/* Paywall banner between L11 and L12 */}
              {lesson.id === 12 && (
                <View
                  className="rounded-xl p-4 mb-3 items-center"
                  style={{ backgroundColor: P.amber + "15", borderWidth: 1, borderColor: P.amber + "30" }}
                >
                  <View className="flex-row items-center gap-2 mb-1">
                    <Lock size={16} color={P.amber} />
                    <Text className="text-sm font-bold" style={{ color: P.amber }}>
                      Premium — $12.99/mo
                    </Text>
                  </View>
                  <Text className="text-xs text-lm-ink3 text-center">
                    Unlock all lessons and continue your journey
                  </Text>
                </View>
              )}
              <LessonCard
                id={lesson.id}
                title={lesson.title}
                sub={lesson.sub}
                difficulty={lesson.difficulty}
                progress={lp(lesson.id)}
                locked={isLocked}
                onPress={() => goToLesson(lesson.id)}
              />
            </View>
          );
        })}

        <View className="h-6" />
      </ScrollView>

      {/* Daily Review Overlay */}
      <DailyReviewOverlay
        visible={showDR}
        items={drItems}
        currentIdx={drIdx}
        answer={drAns}
        onAnswer={setDrAns}
        onNext={handleDrNext}
        onClose={() => setShowDR(false)}
      />

      {/* Account Modal */}
      <Modal visible={showAccount} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/40 justify-center items-center"
          onPress={() => setShowAccount(false)}
        >
          <View className="bg-lm-paper rounded-2xl p-6 mx-8 w-72 border border-lm-border">
            <Text className="text-lg font-bold text-lm-ink mb-1">
              {user?.user_metadata?.display_name ?? "Account"}
            </Text>
            <Text className="text-sm text-lm-ink3 mb-5">
              {user?.email ?? ""}
            </Text>
            <Pressable
              onPress={() => {
                setShowAccount(false);
                signOut();
              }}
              className="rounded-xl py-3 items-center mb-2"
              style={{ backgroundColor: P.red }}
            >
              <Text className="text-white text-sm font-semibold">Sign Out</Text>
            </Pressable>
            <Pressable
              onPress={() => setShowAccount(false)}
              className="rounded-xl py-3 items-center"
              style={{ backgroundColor: P.border }}
            >
              <Text className="text-sm font-semibold text-lm-ink2">Cancel</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
