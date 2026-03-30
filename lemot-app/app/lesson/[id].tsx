import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import {
  ChevronLeft,
  Check,
  Sparkles,
  Lock,
  BookOpen,
  Dumbbell,
  Mic,
  ChevronRight,
  Coffee,
} from "lucide-react-native";
import { useApp } from "@/providers/AppProvider";
import { LESSONS } from "@/data/lessons";
import { SECS, SEC_NAMES, CHUNKS } from "@/constants/sections";
import { P } from "@/constants/theme";
import {
  TransitionScreen,
  type UnlockData,
} from "@/components/TransitionScreen";
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

const CHUNK_ICONS = [BookOpen, Dumbbell, Mic];

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
  afterSec: number;
  threshold: number;
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

  const [sec, setSec] = useState(-1); // -1 = chunk selector
  const [activeChunk, setActiveChunk] = useState(-1); // -1 = not selected
  const [trans, setTrans] = useState<TransitionData | null>(null);
  const [unlocked, setUnlocked] = useState<UnlockKey[]>([]);
  const [chunkComplete, setChunkComplete] = useState(false);

  if (!lesson) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <Text className="text-lm-ink">Lesson not found</Text>
      </SafeAreaView>
    );
  }

  const totalAvailable = countAvailable(lesson);

  // Check if a chunk's sections are all complete
  const isChunkDone = (chunkId: number) => {
    return CHUNKS[chunkId].sections.every(
      (s) => prog[`${lessonId}-${SECS[s]}`]
    );
  };

  // Check if all chunks are done
  const allChunksDone = CHUNKS.every((_, i) => isChunkDone(i));

  // Get current chunk based on active section
  const currentChunk =
    activeChunk >= 0 ? CHUNKS[activeChunk] : null;

  const checkUnlock = (
    sectionIndex: number,
    score: number,
    total: number
  ): UnlockData | null => {
    const rule = UNLOCK_RULES.find(
      (r) => r.afterSec === sectionIndex && !unlocked.includes(r.key)
    );
    if (!rule) return null;

    const data = rule.getData(lesson);
    if (!data) return null;

    if (rule.threshold > 0 && total > 0) {
      const pct = score / total;
      if (pct < rule.threshold) return null;
    }

    setUnlocked((prev) => [...prev, rule.key]);
    return { type: rule.type, data };
  };

  const nextSec = (score: number, total: number, msg: string) => {
    const unlock = checkUnlock(sec, score, total);

    // Check if this was the last section in the current chunk
    if (currentChunk) {
      const lastSecInChunk =
        currentChunk.sections[currentChunk.sections.length - 1];
      if (sec === lastSecInChunk) {
        // Chunk complete — show chunk completion screen
        setTrans({ score, total, msg, next: sec + 1, unlock });
        setChunkComplete(true);
        return;
      }
    }

    setTrans({ score, total, msg, next: sec + 1, unlock });
  };

  const handleTransitionNext = () => {
    if (trans) {
      setSec(trans.next);
      setTrans(null);
    }
  };

  const handleChunkSelect = (chunkId: number) => {
    setActiveChunk(chunkId);
    setSec(CHUNKS[chunkId].sections[0]);
    setChunkComplete(false);
  };

  const handleContinueNextChunk = () => {
    if (activeChunk < CHUNKS.length - 1) {
      handleChunkSelect(activeChunk + 1);
      setTrans(null);
      setChunkComplete(false);
    } else {
      // All chunks done — go to lesson complete
      setSec(11);
      setTrans(null);
      setChunkComplete(false);
    }
  };

  const handleTakeBreak = () => {
    router.back();
  };

  // Error wrappers
  const errFill = (
    word: string,
    section: string,
    given: string,
    correct: string
  ) => {
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
              nextSec(
                0,
                0,
                "Great listening! Now let's look at the patterns..."
              );
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
              nextSec(
                0,
                0,
                "Patterns understood! Time to fill in some Weave sentences..."
              );
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
              nextSec(
                score,
                total,
                "Well done! Now arrange words into sentences..."
              );
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
              nextSec(
                score,
                total,
                "Sentences built! Now write from memory..."
              );
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
              nextSec(
                score,
                total,
                "Quiz complete! Now combine everything..."
              );
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
              nextSec(
                score,
                total,
                "Lesson complete! You're making great progress."
              );
            }}
            onError={errReview}
          />
        );
      default:
        return null;
    }
  };

  // ── CHUNK SELECTOR VIEW ──
  if (sec === -1) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-lm-border bg-lm-paper">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft color={P.ink} size={24} />
          </Pressable>
          <View className="flex-1 ml-2">
            <Text
              className="text-base font-bold text-lm-ink"
              numberOfLines={1}
            >
              {lesson.title}
            </Text>
            <Text className="text-xs text-lm-ink3">{lesson.sub}</Text>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-5 pt-6"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <Text className="text-lg font-bold text-lm-ink mb-1">
            Choose your session
          </Text>
          <Text className="text-xs text-lm-ink3 mb-5">
            Each part takes about 7-8 minutes. Take a break between them!
          </Text>

          {CHUNKS.map((chunk, i) => {
            const Icon = CHUNK_ICONS[i];
            const done = isChunkDone(i);
            const prevDone = i === 0 || isChunkDone(i - 1);
            const secsDone = chunk.sections.filter(
              (s) => prog[`${lessonId}-${SECS[s]}`]
            ).length;
            const progress = secsDone / chunk.sections.length;

            return (
              <Pressable
                key={chunk.id}
                onPress={() => handleChunkSelect(i)}
                className="rounded-2xl mb-3 px-5 py-4"
                style={{
                  backgroundColor: P.paper,
                  borderWidth: 1.5,
                  borderColor: done ? P.green : prevDone ? P.red : P.border,
                  opacity: prevDone ? 1 : 0.5,
                }}
                disabled={!prevDone}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className="items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: done
                        ? P.green + "15"
                        : prevDone
                          ? P.red + "10"
                          : P.border + "40",
                    }}
                  >
                    {done ? (
                      <Check size={20} color={P.green} />
                    ) : (
                      <Icon
                        size={20}
                        color={prevDone ? P.red : P.ink3}
                        strokeWidth={1.5}
                      />
                    )}
                  </View>

                  <View className="flex-1">
                    <Text
                      className="text-sm font-bold"
                      style={{
                        color: done ? P.green : prevDone ? P.ink : P.ink3,
                      }}
                    >
                      Part {i + 1}: {chunk.name}
                    </Text>
                    <Text className="text-xs" style={{ color: P.ink3 }}>
                      {chunk.sub}
                    </Text>
                    {/* Section names */}
                    <Text
                      className="text-xs mt-1"
                      style={{ color: P.ink3 }}
                    >
                      {chunk.sections.map((s) => SEC_NAMES[s]).join(" → ")}
                    </Text>
                  </View>

                  {!done && prevDone && (
                    <ChevronRight size={16} color={P.ink3} />
                  )}
                </View>

                {/* Progress bar */}
                {progress > 0 && (
                  <View
                    className="mt-3"
                    style={{
                      height: 3,
                      backgroundColor: P.border,
                      borderRadius: 2,
                    }}
                  >
                    <View
                      style={{
                        width: `${progress * 100}%`,
                        height: "100%",
                        backgroundColor: done ? P.green : P.red,
                        borderRadius: 2,
                      }}
                    />
                  </View>
                )}
              </Pressable>
            );
          })}

          {/* All done message */}
          {allChunksDone && (
            <View className="items-center mt-4">
              <Text className="text-sm text-lm-green font-semibold">
                All parts complete!
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── LESSON CONTENT VIEW ──
  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-lm-border bg-lm-paper">
        <Pressable
          onPress={() => {
            setSec(-1);
            setActiveChunk(-1);
            setTrans(null);
            setChunkComplete(false);
          }}
          className="p-2 -ml-2"
        >
          <ChevronLeft color={P.ink} size={24} />
        </Pressable>
        <View className="flex-1 ml-2">
          <Text
            className="text-base font-bold text-lm-ink"
            numberOfLines={1}
          >
            {lesson.title}
          </Text>
          {currentChunk && (
            <Text className="text-xs text-lm-ink3">
              Part {activeChunk + 1}: {currentChunk.name}
            </Text>
          )}
        </View>
        {/* Unlock progress indicator */}
        {totalAvailable > 0 && (
          <View className="flex-row items-center gap-1.5 mr-1">
            <Lock
              size={12}
              color={unlocked.length > 0 ? P.amber : P.ink3}
            />
            <Text
              className="text-xs font-semibold"
              style={{ color: unlocked.length > 0 ? P.amber : P.ink3 }}
            >
              {unlocked.length}/{totalAvailable}
            </Text>
            <View className="flex-row gap-1 ml-1">
              {UNLOCK_RULES.filter((r) => r.getData(lesson) !== null).map(
                (r) => (
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

      {/* Section tabs — only show current chunk's sections */}
      {currentChunk && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="border-b border-lm-border bg-lm-paper"
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          {currentChunk.sections.map((sIdx) => {
            const isDone = prog[`${lessonId}-${SECS[sIdx]}`];
            const isActive = sec === sIdx;
            return (
              <Pressable
                key={sIdx}
                onPress={() => {
                  if (!trans && !chunkComplete) setSec(sIdx);
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
                    {SEC_NAMES[sIdx]}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}

      {/* Content */}
      <View className="flex-1">
        {/* Chunk complete screen */}
        {chunkComplete && trans ? (
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 32,
              paddingVertical: 24,
            }}
          >
            <View className="bg-lm-paper rounded-2xl p-8 w-full items-center border border-lm-border">
              {trans.total > 0 && (
                <Text className="text-2xl font-bold text-lm-ink mb-2">
                  {trans.score}/{trans.total}
                </Text>
              )}

              <View
                className="items-center justify-center mb-3"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: P.green + "15",
                }}
              >
                <Check size={24} color={P.green} />
              </View>

              <Text className="text-lg font-bold text-lm-green mb-1">
                Part {activeChunk + 1} Complete!
              </Text>
              <Text className="text-sm text-lm-ink2 text-center leading-6 mb-5">
                {activeChunk < CHUNKS.length - 1
                  ? "Great work! You can continue or take a break."
                  : "Amazing! You've completed the entire lesson!"}
              </Text>

              {trans.unlock && (
                <View className="w-full mb-4">
                  <View className="flex-row items-center justify-center gap-1.5 mb-1">
                    <Sparkles size={14} color={P.amber} />
                    <Text className="text-xs font-bold text-lm-amber">
                      Unlocked!
                    </Text>
                  </View>
                  {/* Inline unlock display */}
                  <View
                    className="rounded-xl p-3 border"
                    style={{ borderColor: P.amber + "40" }}
                  >
                    <Text className="text-xs text-lm-ink2 text-center">
                      {typeof trans.unlock.data === "string"
                        ? trans.unlock.data
                        : trans.unlock.data?.fr ||
                          trans.unlock.data?.title ||
                          "Bonus content unlocked!"}
                    </Text>
                  </View>
                </View>
              )}

              {activeChunk < CHUNKS.length - 1 && (
                <Pressable
                  onPress={handleContinueNextChunk}
                  className="rounded-xl px-6 py-3 w-full mb-2"
                  style={{ backgroundColor: P.red }}
                >
                  <Text className="text-white font-semibold text-center">
                    Continue: Part {activeChunk + 2} —{" "}
                    {CHUNKS[activeChunk + 1].name}
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={
                  activeChunk >= CHUNKS.length - 1
                    ? handleContinueNextChunk
                    : handleTakeBreak
                }
                className="rounded-xl px-6 py-3 w-full flex-row items-center justify-center gap-2"
                style={{
                  backgroundColor:
                    activeChunk >= CHUNKS.length - 1 ? P.green : P.paper,
                  borderWidth: activeChunk >= CHUNKS.length - 1 ? 0 : 1,
                  borderColor: P.border,
                }}
              >
                {activeChunk < CHUNKS.length - 1 && (
                  <Coffee size={14} color={P.ink2} />
                )}
                <Text
                  className="font-semibold text-center"
                  style={{
                    color:
                      activeChunk >= CHUNKS.length - 1 ? "white" : P.ink2,
                  }}
                >
                  {activeChunk >= CHUNKS.length - 1
                    ? "Finish Lesson"
                    : "Take a Break"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        ) : trans ? (
          <TransitionScreen
            score={trans.score}
            total={trans.total}
            message={trans.msg}
            onNext={handleTransitionNext}
            unlock={trans.unlock}
          />
        ) : sec > 10 ? (
          <ScrollView
            className="flex-1 px-8"
            contentContainerStyle={{ paddingTop: 40, paddingBottom: 32 }}
          >
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
                    <Check
                      size={14}
                      color={P.green}
                      style={{ marginTop: 2 }}
                    />
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
              <Text className="text-white font-semibold text-center">
                Back to Journey
              </Text>
            </Pressable>
          </ScrollView>
        ) : (
          <ScrollView
            className="flex-1 px-5 pt-4"
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            {renderSection()}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
