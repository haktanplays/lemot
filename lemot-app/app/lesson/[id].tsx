import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, Check, Sparkles, Lock } from "lucide-react-native";
import { useApp } from "@/providers/AppProvider";
import { LESSONS } from "@/data/lessons";
import { SECS, SEC_NAMES } from "@/constants/sections";
import { P } from "@/constants/theme";
import { TransitionScreen, type UnlockData } from "@/components/TransitionScreen";
import type { Lesson } from "@/lib/types";
import type { UnlockType } from "@/components/UnlockCard";

// Section components
import { ReadListen } from "@/components/sections/ReadListen";
import { Patterns } from "@/components/sections/Patterns";
import { WeaveFill } from "@/components/sections/WeaveFill";
import { FrenchFill } from "@/components/sections/FrenchFill";
import { WriteSection } from "@/components/sections/WriteSection";
import { BuildSentence } from "@/components/sections/BuildSentence";
import { Quiz } from "@/components/sections/Quiz";
import { CombineWeave } from "@/components/sections/CombineWeave";
import { SayItYourWay } from "@/components/sections/SayItYourWay";
import { MiniConversation } from "@/components/sections/MiniConversation";
import { Review } from "@/components/sections/Review";

type UnlockKey =
  | "expr1"
  | "expr2"
  | "expr3"
  | "nugget1"
  | "nugget2"
  | "fauxAmi"
  | "culture"
  | "sound";

interface UnlockRule {
  key: UnlockKey;
  afterSec: number; // section index that triggers unlock check
  threshold: number; // 0 = completion only, otherwise percentage (0-1)
  type: UnlockType;
  getData: (lesson: Lesson) => any | null;
}

const UNLOCK_RULES: UnlockRule[] = [
  {
    key: "expr1",
    afterSec: 0,
    threshold: 0,
    type: "expression",
    getData: (l) => l.expressions?.[0] ?? null,
  },
  {
    key: "nugget1",
    afterSec: 1,
    threshold: 0,
    type: "grammarNugget",
    getData: (l) => l.grammarNuggets?.[0] ?? null,
  },
  {
    key: "expr2",
    afterSec: 2,
    threshold: 0.7,
    type: "expression",
    getData: (l) => l.expressions?.[1] ?? null,
  },
  {
    key: "fauxAmi",
    afterSec: 3,
    threshold: 0.7,
    type: "fauxAmi",
    getData: (l) => l.fauxAmis?.[0] ?? null,
  },
  {
    key: "nugget2",
    afterSec: 4,
    threshold: 0.6,
    type: "grammarNugget",
    getData: (l) => l.grammarNuggets?.[1] ?? null,
  },
  {
    key: "sound",
    afterSec: 5,
    threshold: 0.7,
    type: "soundPattern",
    getData: (l) => l.soundPatterns?.[0] ?? null,
  },
  {
    key: "expr3",
    afterSec: 6,
    threshold: 0.8,
    type: "expression",
    getData: (l) => l.expressions?.[2] ?? null,
  },
  {
    key: "culture",
    afterSec: 7,
    threshold: 0.7,
    type: "cultureBite",
    getData: (l) => l.cultureBite ?? null,
  },
];

/** Count how many unlock slots are available for this lesson (have data) */
function countAvailable(lesson: Lesson): number {
  return UNLOCK_RULES.filter((r) => r.getData(lesson) !== null).length;
}

interface TransitionData {
  score: number;
  total: number;
  msg: string;
  next: number;
  unlock?: UnlockData | null;
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lessonId = parseInt(id || "1", 10);
  const lesson = LESSONS.find((l) => l.id === lessonId);

  const { mk, gx, lp, logErr, say, prog } = useApp();

  const [sec, setSec] = useState(0);
  const [trans, setTrans] = useState<TransitionData | null>(null);
  const [unlocked, setUnlocked] = useState<UnlockKey[]>([]);

  if (!lesson) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <Text className="text-lm-ink">Lesson not found</Text>
      </SafeAreaView>
    );
  }

  const totalAvailable = countAvailable(lesson);

  const checkUnlock = (
    sectionIndex: number,
    score: number,
    total: number
  ): UnlockData | null => {
    // Find rule that triggers after this section
    const rule = UNLOCK_RULES.find(
      (r) => r.afterSec === sectionIndex && !unlocked.includes(r.key)
    );
    if (!rule) return null;

    const data = rule.getData(lesson);
    if (!data) return null;

    // Check threshold: 0 means always unlock on completion
    if (rule.threshold > 0 && total > 0) {
      const pct = score / total;
      if (pct < rule.threshold) return null;
    }

    // Unlock it
    setUnlocked((prev) => [...prev, rule.key]);
    return { type: rule.type, data };
  };

  const nextSec = (score: number, total: number, msg: string) => {
    const unlock = checkUnlock(sec, score, total);
    setTrans({ score, total, msg, next: sec + 1, unlock });
  };

  const handleTransitionNext = () => {
    if (trans) {
      setSec(trans.next);
      setTrans(null);
    }
  };

  // Each section component has slightly different onError signatures.
  // Create wrappers that normalize to logErr(word, section, given, correct, lessonId).
  const errFill = (word: string, section: string, given: string, correct: string) => {
    logErr(word, section, given, correct, lessonId);
  };
  const errQuiz = (word: string, given: string, correct: string) => {
    logErr(word, "quiz", given, correct, lessonId);
  };
  const errBuild = (word: string, given: string, correct: string) => {
    logErr(word, "build", given, correct, lessonId);
  };
  const errCombine = (word: string, given: string, correct: string) => {
    logErr(word, "combine_fg", given, correct, lessonId);
  };
  const errReview = (correct: string, given: string) => {
    logErr(correct, "review", given, correct, lessonId);
  };

  const renderSection = () => {
    switch (sec) {
      case 0:
        return (
          <ReadListen
            examples={lesson.examples}
            say={say}
            onComplete={() => {
              mk(lessonId, "read_listen");
              gx(10);
              nextSec(0, 0, "Great listening! Now let's look at the patterns...");
            }}
          />
        );
      case 1:
        return (
          <Patterns
            grammar={lesson.grammar}
            say={say}
            onComplete={() => {
              mk(lessonId, "patterns");
              gx(10);
              nextSec(0, 0, "Patterns understood! Time to fill in some Weave sentences...");
            }}
          />
        );
      case 2:
        return (
          <WeaveFill
            items={lesson.fillFG}
            onComplete={(score, total) => {
              mk(lessonId, "fill_fg");
              gx(15);
              nextSec(score, total, "Nice Weave! Now try fully in French...");
            }}
            onError={errFill}
          />
        );
      case 3:
        return (
          <FrenchFill
            items={lesson.fillBlanks}
            onComplete={(score, total) => {
              mk(lessonId, "fill_fr");
              gx(15);
              nextSec(score, total, "Well done! Now arrange words into sentences...");
            }}
            onError={errFill}
          />
        );
      case 4:
        return (
          <BuildSentence
            items={lesson.buildSentences}
            onComplete={(score, total) => {
              mk(lessonId, "build");
              gx(15);
              nextSec(score, total, "Sentences built! Now write from memory...");
            }}
            onError={errBuild}
          />
        );
      case 5:
        return (
          <WriteSection
            items={lesson.fillBlanks}
            onComplete={(score, total) => {
              mk(lessonId, "fill_write");
              gx(15);
              nextSec(score, total, "Great writing! Time for a quiz...");
            }}
            onError={errFill}
          />
        );
      case 6:
        return (
          <Quiz
            items={lesson.quiz}
            onComplete={(score, total) => {
              mk(lessonId, "quiz");
              gx(20);
              nextSec(score, total, "Quiz complete! Now combine everything...");
            }}
            onError={errQuiz}
          />
        );
      case 7:
        return (
          <CombineWeave
            combine={lesson.combine}
            weave={lesson.weave}
            onComplete={(score, total) => {
              mk(lessonId, "combine_fg");
              gx(20);
              nextSec(
                score,
                total,
                "Now express yourself freely in French \u2014 no hints, just you!"
              );
            }}
            onError={errCombine}
          />
        );
      case 8:
        return (
          <SayItYourWay
            items={lesson.sayIt}
            onComplete={() => {
              mk(lessonId, "say_it");
              gx(20);
              nextSec(
                0,
                0,
                "Great writing! Now let's have a quick conversation..."
              );
            }}
          />
        );
      case 9:
        return (
          <MiniConversation
            topic={lesson.miniConv.topic}
            starter={lesson.miniConv.starter}
            say={say}
            onComplete={() => {
              mk(lessonId, "mini_conv");
              gx(25);
              nextSec(
                0,
                0,
                "Conversation complete! Let's review what you've learned."
              );
            }}
          />
        );
      case 10:
        return (
          <Review
            items={lesson.review}
            say={say}
            onComplete={(score, total) => {
              mk(lessonId, "review");
              gx(25);
              nextSec(score, total, "Lesson complete! You're making great progress.");
            }}
            onError={errReview}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-lm-border bg-lm-paper">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <ChevronLeft color={P.ink} size={24} />
        </Pressable>
        <View className="flex-1 ml-2">
          <Text className="text-base font-bold text-lm-ink" numberOfLines={1}>
            {lesson.title}
          </Text>
          <Text className="text-xs text-lm-ink3">{lesson.level}</Text>
        </View>
        {/* Unlock progress indicator */}
        {totalAvailable > 0 && (
          <View className="flex-row items-center gap-1.5 mr-1">
            <Lock size={12} color={unlocked.length > 0 ? P.amber : P.ink3} />
            <Text
              className="text-xs font-semibold"
              style={{ color: unlocked.length > 0 ? P.amber : P.ink3 }}
            >
              {unlocked.length}/{totalAvailable}
            </Text>
            <View className="flex-row gap-1 ml-1">
              {UNLOCK_RULES.filter((r) => r.getData(lesson) !== null).map(
                (r, i) => (
                  <View
                    key={r.key}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: unlocked.includes(r.key)
                        ? P.amber
                        : P.border,
                    }}
                  />
                )
              )}
            </View>
          </View>
        )}
      </View>

      {/* Section tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-lm-border bg-lm-paper"
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {SEC_NAMES.map((name, i) => {
          const isDone = prog[`${lessonId}-${SECS[i]}`];
          const isActive = sec === i;
          return (
            <Pressable
              key={i}
              onPress={() => {
                if (!trans) setSec(i);
              }}
              className="px-3 py-2.5 mr-1"
              style={{
                borderBottomWidth: isActive ? 2 : 0,
                borderBottomColor: P.red,
              }}
            >
              <View className="flex-row items-center gap-1">
                {isDone && <Check size={10} color={P.green} />}
                <Text
                  className="text-xs"
                  style={{
                    color: isActive ? P.red : isDone ? P.green : P.ink3,
                    fontWeight: isActive ? "700" : "400",
                  }}
                >
                  {name}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Content */}
      <View className="flex-1">
        {trans ? (
          <TransitionScreen
            score={trans.score}
            total={trans.total}
            message={trans.msg}
            onNext={handleTransitionNext}
            unlock={trans.unlock}
          />
        ) : sec > 10 ? (
          <ScrollView className="flex-1 px-8" contentContainerStyle={{ paddingTop: 40, paddingBottom: 32 }}>
            <View className="items-center mb-6">
              <Text className="text-xl font-bold text-lm-green mb-2">
                Lesson Complete!
              </Text>
              <Text className="text-sm text-lm-ink2 text-center">
                You've completed all sections. Great job!
              </Text>
            </View>

            {/* Summary Card */}
            {lesson.summary && lesson.summary.length > 0 && (
              <View className="bg-lm-paper rounded-2xl p-5 mb-6 border border-lm-border">
                <View className="flex-row items-center gap-2 mb-3">
                  <Sparkles size={16} color={P.amber} />
                  <Text className="text-sm font-bold text-lm-ink">
                    What you learned today
                  </Text>
                </View>
                {lesson.summary.map((item, i) => (
                  <View key={i} className="flex-row items-start gap-2 mb-2">
                    <Check size={14} color={P.green} style={{ marginTop: 2 }} />
                    <Text className="text-xs text-lm-ink2 flex-1 leading-5">
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {lessonId < 16 && (
              <Pressable
                onPress={() => router.replace(`/lesson/${lessonId + 1}`)}
                className="rounded-xl px-6 py-3 mb-3"
                style={{ backgroundColor: P.red }}
              >
                <Text className="text-white font-semibold text-center">
                  Next Lesson
                </Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => router.back()}
              className="bg-lm-green rounded-xl px-6 py-3 mb-4"
            >
              <Text className="text-white font-semibold text-center">Back to Journey</Text>
            </Pressable>
          </ScrollView>
        ) : (
          <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
            {renderSection()}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
