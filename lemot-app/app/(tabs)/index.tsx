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
import { FEATURES, PRODUCT_STAGE, V1_PATH_MAX_LESSON, isV1LessonInStageScope } from "@/config/productStage";
import { supabaseReady } from "@/lib/supabase";
import { kvStorage } from "@/lib/storage";
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

const SEEN_LESSON_ZERO_KEY = "lm7_seen_lesson_zero";

// Mirrors LessonRendererV1's completion marker: a finished v1 lesson writes
// prog["{number}-read_listen"] = true. Home reads the same key to drive the
// simple linear unlock of the L1-L24 path (no scoring, no ceremony).
const V1_COMPLETION_SECTION_KEY = "read_listen";

// Time-aware Home greeting from device local time:
// 05:00-17:59 -> Bonjour., 18:00-04:59 -> Bonsoir. Computed per render, no
// persistence; an already-open app does not need to flip exactly at 18:00.
function getHomeGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  return hour >= 5 && hour < 18 ? "Bonjour." : "Bonsoir.";
}

export default function HomeScreen() {
  const { lp, dailyRev, updateDailyReview, prog, weakSpots, loaded } = useApp();
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
    if (needsLessonZero) {
      router.replace("/lesson-zero" as never);
    }
  }, [needsLessonZero]);

  // Account modal state
  const [showAccount, setShowAccount] = useState(false);

  // Daily review state
  const [showDR, setShowDR] = useState(false);
  const [drIdx, setDrIdx] = useState(0);
  const [drAns, setDrAns] = useState<string | null>(null);
  const [drItems, setDrItems] = useState<ReviewQuestion[]>([]);

  if (!loaded || needsLessonZero) {
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

  // Journey image / phase — driven by the actual v1 path position, computed
  // below from v1PathState (the highest completed v1 lesson NUMBER). The image
  // no longer depends on the legacy LESSONS list, which stayed phase-0 for a v1
  // learner and made the hero misrepresent progress. Phases 1-4 already span
  // L1-L24 in A1, so this reuses existing art and existing phase data with the
  // correct source — no new stage mapping and no new image is introduced.

  // Daily quote
  const quote = MOTIV[Math.floor(Date.now() / 86400000) % MOTIV.length];

  // Lesson scope: dev-apk hides the legacy lesson list entirely so the v1
  // Lesson 1 smoke path is the only lesson surface. Sandbox/public-beta keep
  // the full curriculum visible. This is scope control, not monetization —
  // no paywall, no locks, no banners.
  const visibleLessons = PRODUCT_STAGE === "dev-apk" ? [] : LESSONS;

  // v1 lesson path (L1-L24). Surfaced for internal (sandbox) and the
  // dev-apk tester wave only; public-beta keeps it hidden. Home-only
  // condition; does NOT flip the v1LessonEngine feature flag.
  const showV1Path =
    PRODUCT_STAGE === "sandbox" || PRODUCT_STAGE === "dev-apk";

  // The full authored path is L0-L24. The bridge (L0 / number 0) is excluded so
  // it never appears as a normal lesson card. Everything from L1 up to the
  // stage's slice ceiling is visible under the same linear unlock — the unlock
  // rule below is untouched, only the range it runs over.
  //
  // In dev-apk that ceiling is L10, the end of the slice that went through the
  // production budget. See V1_PATH_MAX_LESSON_BY_STAGE: it is a build boundary,
  // not a paywall and not a course ending.
  const v1PathLessons = V1_LESSONS.filter(
    (l) => isV1LessonInStageScope(l.number)
  ).sort((a, b) => a.number - b.number);
  const v1Done = (n: number) =>
    prog[`${n}-${V1_COMPLETION_SECTION_KEY}`] === true;

  // Simple linear unlock: L1 is open; lesson n+1 opens when lesson n is done.
  // Prerequisite behaviour is unchanged — only the visible range moved.
  let v1PrevDone = true;
  const v1PathState = v1PathLessons.map((l) => {
    const done = v1Done(l.number);
    const available = v1PrevDone;
    v1PrevDone = done;
    return { lesson: l, done, available };
  });

  // Exactly one recommended next step: the first lesson that is open and not
  // yet finished. Every other row stays quiet, so there is never a second
  // competing primary action on this screen.
  const nextLessonId =
    v1PathState.find(({ done, available }) => available && !done)?.lesson.id ??
    null;
  // The lock reason is stated ONCE, under the first locked row, instead of
  // repeating the same sentence beneath every row below it.
  const firstLockedId =
    v1PathState.find(({ done, available }) => !available && !done)?.lesson.id ??
    null;

  // Presentation tiers over the SAME linear-unlock state — no new progression
  // logic. The next step is the one dominant anchor; everything else is quiet.
  const nextState = v1PathState.find(({ lesson }) => lesson.id === nextLessonId);
  const crossedStates = v1PathState.filter(({ done }) => done);
  // Ahead = everything not done and not the anchor. A row that is `available`
  // here is the rare seeded-gap case (a later lesson finished out of order): it
  // stays tappable and is NOT labelled "Not yet", so the label matches real
  // availability. Truly locked rows stay dimmed and disabled.
  const aheadStates = v1PathState.filter(
    ({ lesson, done }) => !done && lesson.id !== nextLessonId,
  );
  const allComplete = showV1Path && v1PathState.length > 0 && nextState === undefined && aheadStates.length === 0;

  // The hero reflects the highest completed v1 lesson number (0 when fresh),
  // feeding the existing phase/image helpers with the correct source.
  const highestV1Done = crossedStates.reduce(
    (max, { lesson }) => (lesson.number > max ? lesson.number : max),
    0,
  );
  const journeyPhase = getJourneyPhase(highestV1Done);
  const journeyImage = getJourneyImage(highestV1Done);

  const greeting = getHomeGreeting();

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <ScrollView className="flex-1 px-5" decelerationRate="normal">
        {/* Header */}
        <View className="pt-6 pb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-base font-bold text-lm-ink">{greeting}</Text>
            <Text className="text-xs text-lm-ink3">
              {allComplete
                ? "You have walked the whole path for now."
                : "Your next step is ready."}
            </Text>
          </View>
          {/* Sign In / Account entry only renders when Supabase is configured.
              In a build without Supabase env (Round 1 dev-apk), accounts do not
              exist, so an actionable Sign In CTA would be a dead end. This is
              the only opener of the Account modal, so that stays unreachable too. */}
          {supabaseReady && (
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
          )}
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

        {/* The Journey path (L1-L24) — the full authored lesson surface, shaped
            as a calm path rather than 24 equal-weight rows. One dominant next
            step anchors the screen; the road ahead and the ground already
            walked stay quiet and compact but every lesson remains reachable.
            Surfaced in sandbox (internal comparison) and dev-apk (tester wave);
            public-beta keeps it hidden. No reward / unlock ceremony language. */}
        {showV1Path && v1PathState.length > 0 && (
          <View className="mt-2 mb-3">
            {/* WHAT DO I DO NEXT — the single dominant focal element, derived
                from the same lesson the linear logic already flags as next. */}
            {nextState && (
              <View className="mb-6">
                <Text
                  className="text-xs mb-2"
                  style={{ color: P.ink3, letterSpacing: 0.4 }}
                >
                  Your next step
                </Text>
                <Pressable
                  onPress={() =>
                    router.push(`/v1-lesson/${nextState.lesson.id}` as never)
                  }
                  className="bg-lm-paper rounded-2xl border"
                  style={{
                    borderColor: P.red + "55",
                    borderWidth: 1.5,
                    padding: 18,
                  }}
                >
                  <Text
                    className="text-lg"
                    style={{
                      color: P.ink,
                      fontFamily: "serif",
                      fontStyle: "italic",
                      lineHeight: 26,
                    }}
                  >
                    {nextState.lesson.title}
                  </Text>
                  <Text
                    className="text-sm mt-1.5"
                    style={{ color: P.ink2, lineHeight: 20 }}
                  >
                    {nextState.lesson.canDo}
                  </Text>
                  <View
                    className="rounded-xl items-center mt-4"
                    style={{ backgroundColor: P.red, paddingVertical: 12 }}
                  >
                    <Text
                      style={{ color: P.paper, fontSize: 15, fontWeight: "600" }}
                    >
                      {crossedStates.length === 0 ? "Begin" : "Start"}
                    </Text>
                  </View>
                </Pressable>
              </View>
            )}

            {/* WHERE THE PATH IS COMPLETE — a passive reflection, no ceremony,
                no fake next lesson, no L25. Every lesson stays below for replay. */}
            {allComplete && (
              <View
                className="mb-6 rounded-2xl border"
                style={{ backgroundColor: P.paper, borderColor: P.border, padding: 18 }}
              >
                <Text
                  className="text-lg"
                  style={{
                    color: P.ink,
                    fontFamily: "serif",
                    fontStyle: "italic",
                    lineHeight: 26,
                  }}
                >
                  You have walked the whole path.
                </Text>
                <Text
                  className="text-sm mt-1.5"
                  style={{ color: P.ink2, lineHeight: 20 }}
                >
                  Every moment is still here. Return to any of it whenever you like.
                </Text>
              </View>
            )}

            {/* THE ROAD AHEAD — restrained. The path clearly continues, order
                stays legible, locked rows cannot open, but future work does not
                demand equal attention. Rendered compact and dimmed. */}
            {aheadStates.length > 0 && (
              <View className="mb-6">
                <Text
                  className="text-xs mb-2"
                  style={{ color: P.ink3, letterSpacing: 0.4 }}
                >
                  The road ahead
                </Text>
                {aheadStates.map(({ lesson, done, available }) => {
                  const locked = !available && !done;
                  return (
                    <Pressable
                      key={lesson.id}
                      disabled={locked}
                      onPress={() =>
                        router.push(`/v1-lesson/${lesson.id}` as never)
                      }
                      className="flex-row items-center justify-between border-b"
                      style={{
                        borderBottomColor: P.border,
                        paddingVertical: 12,
                        opacity: locked ? 0.5 : 1,
                      }}
                    >
                      <View className="flex-1 pr-3">
                        <Text
                          className="text-sm"
                          style={{ color: P.ink2 }}
                          numberOfLines={1}
                        >
                          {lesson.title}
                        </Text>
                        {/* Said once, under the first locked row only. */}
                        {lesson.id === firstLockedId && (
                          <Text
                            className="text-xs mt-0.5"
                            style={{ color: P.ink3 }}
                          >
                            Opens when you finish the lesson before it.
                          </Text>
                        )}
                      </View>
                      <Text className="text-xs" style={{ color: P.ink3 }}>
                        {locked ? "Not yet" : "Open"}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {/* WHAT HAVE I CROSSED — visible and replayable, but quiet. Compact
                rows, not full cards, so history never competes with the next
                step. Kept in authored order for a legible trail. */}
            {crossedStates.length > 0 && (
              <View>
                <Text
                  className="text-xs mb-2"
                  style={{ color: P.ink3, letterSpacing: 0.4 }}
                >
                  Behind you
                </Text>
                {crossedStates.map(({ lesson }) => (
                  <Pressable
                    key={lesson.id}
                    onPress={() =>
                      router.push(`/v1-lesson/${lesson.id}` as never)
                    }
                    className="flex-row items-center justify-between border-b"
                    style={{ borderBottomColor: P.border, paddingVertical: 12 }}
                  >
                    <Text
                      className="text-sm flex-1 pr-3"
                      style={{ color: P.ink2 }}
                      numberOfLines={1}
                    >
                      {lesson.title}
                    </Text>
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: P.green }}
                    >
                      Done
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
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
