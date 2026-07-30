import { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator, Modal, Image } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Target, Lock, User } from "lucide-react-native";
import { useApp } from "@/providers/AppProvider";
import { useAuthContext } from "@/providers/AuthProvider";
import { LESSONS } from "@/data/lessons";
import { V1_LESSONS } from "@/content/lessons/v1";
import { MILESTONES, FREE_LESSON_IDS } from "@/data/milestones";
import { FEATURES, PRODUCT_STAGE } from "@/config/productStage";
import { supabaseReady } from "@/lib/supabase";
import { kvStorage } from "@/lib/storage";
import { MOTIV, P } from "@/constants/theme";
import { SECS } from "@/constants/sections";
import { getJourneyImage, getJourneyPhase } from "@/constants/journey";
import { LessonCard } from "@/components/LessonCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { Btn } from "@/components/Btn";
import { LearningPausedPanel } from "@/components/learning-engine/LearningPausedPanel";
import { PrivacyDataControls } from "@/components/learning-engine/PrivacyDataControls";
import type { ReviewQuestion } from "@/components/DailyReviewOverlay";
import {
  DailyReviewOverlay,
  genReviewItems,
} from "@/components/DailyReviewOverlay";

const SEEN_LESSON_ZERO_KEY = "lm7_seen_lesson_zero";

// Mirrors LessonRendererV1's completion marker: a finished v1 lesson writes
// prog["{number}-read_listen"] = true. Home reads the same key to drive the
// simple linear unlock of the L1-L6 path (no scoring, no ceremony).
const V1_COMPLETION_SECTION_KEY = "read_listen";

// Time-aware Home greeting from device local time:
// 05:00-17:59 -> Bonjour., 18:00-04:59 -> Bonsoir. Computed per render, no
// persistence; an already-open app does not need to flip exactly at 18:00.
function getHomeGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  return hour >= 5 && hour < 18 ? "Bonjour." : "Bonsoir.";
}

export default function HomeScreen() {
  const { lp, dailyRev, updateDailyReview, prog, weakSpots, loaded, learningPaused } =
    useApp();
  const { user, signOut } = useAuthContext();

  // First-use redirect: read sync from storage on first render so we can hide
  // Home behind the spinner while expo-router transitions to /lesson-zero,
  // avoiding a flash of the Home UI before the redirect lands.
  const [needsLessonZero] = useState(() => {
    try {
      return kvStorage.getItem(SEEN_LESSON_ZERO_KEY) !== "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // expo-router's typed-routes union regenerates on `expo start`; the cast
    // bypasses the stale literal check until Metro picks up the new files.
    // Lesson Zero now leads straight into Lesson 1; the How Weave Works
    // explainer is no longer a mandatory first-run step (its route remains
    // reachable at /how-weave-works).
    // PR-I1 (Codex P2): never redirect a paused first-use user into Lesson
    // Zero — its progress could not be saved. The redirect waits for
    // loaded && !learningPaused; the paused branch below keeps the user out of
    // the spinner in the meantime.
    if (loaded && !learningPaused && needsLessonZero) {
      router.replace("/lesson-zero" as never);
    }
  }, [needsLessonZero, loaded, learningPaused]);

  // Account modal state
  const [showAccount, setShowAccount] = useState(false);

  // Daily review state
  const [showDR, setShowDR] = useState(false);
  const [drIdx, setDrIdx] = useState(0);
  const [drAns, setDrAns] = useState<string | null>(null);
  const [drItems, setDrItems] = useState<ReviewQuestion[]>([]);

  // The Lesson-Zero leg of the spinner only applies while the redirect can
  // actually fire — a PAUSED first-use user falls through to the paused Home
  // below instead of being trapped behind an endless spinner (Codex P2).
  if (!loaded || (needsLessonZero && !learningPaused)) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <ActivityIndicator size="small" color={P.red} />
      </SafeAreaView>
    );
  }

  // Account entry + modal are shared by the paused and normal branches, so
  // sign-out stays reachable while learning is paused.
  const accountButton = (
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
  );

  const accountModal = (
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
  );

  // PR-I1 (Codex P2): while the learner-mutation gate is closed, durable
  // learner writes are intentionally rejected — Home must not offer lessons,
  // the v1 path, or Daily Review (their apparent progress would be silently
  // dropped). The paused Home keeps the account entry, the privacy
  // retry/confirm/blocked controls, and a calm explanation. It reopens
  // reactively when the gate does — no reload, no repeated privacy operation.
  if (learningPaused) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        <ScrollView className="flex-1 px-5" decelerationRate="normal">
          <View className="pt-6 pb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-base font-bold text-lm-ink">
                {getHomeGreeting()}
              </Text>
              <Text className="text-xs text-lm-ink3">
                Learning is paused for a moment.
              </Text>
            </View>
            {supabaseReady && (accountButton)}
          </View>
          <LearningPausedPanel />
          <PrivacyDataControls />
          <View className="h-6" />
        </ScrollView>
        {accountModal}
      </SafeAreaView>
    );
  }

  const today = () => new Date().toISOString().slice(0, 10);
  const drCount = dailyRev.date === today() ? dailyRev.count : 0;
  const todayDone = drCount >= 5;

  const startDailyReview = () => {
    const remaining = 5 - drCount;
    if (remaining <= 0) return;
    // Daily Review must only draw from lessons the learner has reached.
    // `lp(id) > 0` = at least one section started in that lesson. Floored
    // at 1 so a brand-new learner still sees L1 cards via the safe
    // fallback in genReviewItems, never future-lesson content.
    const reachedLesson = LESSONS.reduce(
      (max, l) => (lp(l.id) > 0 && l.id > max ? l.id : max),
      0,
    );
    const maxEligibleLesson = Math.max(reachedLesson, 1);
    const items = genReviewItems(remaining, weakSpots, maxEligibleLesson);
    if (items.length === 0) return;
    setDrItems(items);
    setDrIdx(0);
    setDrAns(null);
    setShowDR(true);
  };

  const handleDrNext = () => {
    const newCount = drCount + 1;
    const newDr = { date: today(), count: newCount };
    // Atomic daily-review update — preserves progress + errors and syncs to
    // cloud (audit B6). Replaces the prior stale-snapshot save(prog, errors, dr).
    updateDailyReview(() => newDr);
    if (drIdx >= drItems.length - 1) {
      setShowDR(false);
      setDrIdx(0);
      setDrAns(null);
    } else {
      setDrIdx(drIdx + 1);
      setDrAns(null);
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

  // Lesson scope: dev-apk hides the legacy lesson list entirely so the v1
  // Lesson 1 smoke path is the only lesson surface. Sandbox/public-beta keep
  // the full curriculum visible. This is scope control, not monetization —
  // no paywall, no locks, no banners.
  const visibleLessons = PRODUCT_STAGE === "dev-apk" ? [] : LESSONS;

  // v1 Round 1 lesson path (L1-L6). Surfaced for internal (sandbox) and the
  // dev-apk tester wave only; public-beta keeps it hidden. Home-only
  // condition; does NOT flip the v1LessonEngine feature flag.
  const showV1Path =
    PRODUCT_STAGE === "sandbox" || PRODUCT_STAGE === "dev-apk";

  // Round 1 dev-apk scope is L0-L6. The bridge (L0 / number 0) is excluded so
  // it never appears as a normal lesson card, and nothing above L6 is shown.
  const v1PathLessons = V1_LESSONS.filter(
    (l) => l.number >= 1 && l.number <= 6
  ).sort((a, b) => a.number - b.number);
  const v1Done = (n: number) =>
    prog[`${n}-${V1_COMPLETION_SECTION_KEY}`] === true;

  // Simple linear unlock: L1 is open; lesson n+1 opens when lesson n is done.
  let v1PrevDone = true;
  const v1PathState = v1PathLessons.map((l) => {
    const done = v1Done(l.number);
    const available = v1PrevDone;
    v1PrevDone = done;
    return { lesson: l, done, available };
  });

  const greeting = getHomeGreeting();

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <ScrollView className="flex-1 px-5" decelerationRate="normal">
        {/* Header */}
        <View className="pt-6 pb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-base font-bold text-lm-ink">{greeting}</Text>
            <Text className="text-xs text-lm-ink3">
              Your next step is ready.
            </Text>
          </View>
          {/* Sign In / Account entry only renders when Supabase is configured.
              In a build without Supabase env (Round 1 dev-apk), accounts do not
              exist, so an actionable Sign In CTA would be a dead end. This is
              the only opener of the Account modal, so that stays unreachable too. */}
          {supabaseReady && (accountButton)}
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

        {/* Daily Review — hidden in dev-apk (FEATURES.dailyReview=false): the
            legacy flashcard pool surfaces untaught vocabulary, and v1 Round 1
            has no review surface. Sandbox / public-beta keep it visible. */}
        {FEATURES.dailyReview && (
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
              You used French today.
            </Text>
          )}
        </View>
        )}

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
        {visibleLessons.length > 0 && (
          <Text className="text-lg font-bold text-lm-ink mb-3">Lessons</Text>
        )}
        {visibleLessons.map((lesson) => {
          const isFree = FREE_LESSON_IDS.includes(lesson.id);
          const isLocked = FEATURES.paywall && !isFree;
          return (
            <View key={lesson.id}>
              {/* Paywall banner between L11 and L12 — only when paywall feature is enabled */}
              {FEATURES.paywall && lesson.id === 12 && (
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

        {/* v1 Round 1 path (L1-L6) — the dev-apk first-run lesson surface.
            Surfaced in sandbox (internal comparison) and dev-apk (tester
            wave); public-beta keeps it hidden. Linear unlock; completed
            lessons read as Done, locked ones stay quiet. No reward / unlock
            ceremony language. */}
        {showV1Path && v1PathState.length > 0 && (
          <View className="mt-2 mb-3">
            <Text className="text-lg font-bold text-lm-ink mb-3">
              Your path
            </Text>
            {v1PathState.map(({ lesson, done, available }) => {
              const locked = !available && !done;
              const stateLabel = done ? "Done" : available ? "Start" : "Not yet";
              const stateColor = done ? P.green : available ? P.red : P.ink3;
              return (
                <Pressable
                  key={lesson.id}
                  disabled={locked}
                  onPress={() =>
                    router.push(`/v1-lesson/${lesson.id}` as never)
                  }
                  className="bg-lm-paper rounded-xl p-4 border mb-2"
                  style={{ borderColor: P.border, opacity: locked ? 0.55 : 1 }}
                >
                  <View className="flex-row items-center justify-between">
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: P.ink }}
                    >
                      {lesson.title}
                    </Text>
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: stateColor }}
                    >
                      {stateLabel}
                    </Text>
                  </View>
                  <Text className="text-xs mt-0.5" style={{ color: P.ink3 }}>
                    {locked
                      ? "Complete the previous lesson first"
                      : lesson.canDo}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

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

      {/* Account Modal (shared with the paused branch) */}
      {accountModal}
    </SafeAreaView>
  );
}
