import { useState, useCallback, useMemo } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Lock,
  RotateCcw,
  Volume2,
} from "lucide-react-native";
import { P } from "@/constants/theme";
import { LESSONS } from "@/data/lessons";
import { MILESTONES } from "@/data/milestones";
import { useApp } from "@/providers/AppProvider";
import { norm } from "@/lib/normalize";
import type { FillItem, QuizItem, Lesson } from "@/lib/types";

type Stage = "select" | "session" | "done";

/* Exercise pulled from a lesson's static pool */
type PracticeExercise =
  | { type: "fill_fg"; item: FillItem }
  | { type: "fill_fr"; item: FillItem }
  | { type: "quiz"; item: QuizItem };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildExercises(lesson: Lesson, count: number): PracticeExercise[] {
  const pool: PracticeExercise[] = [
    ...lesson.fillFG.map((item) => ({ type: "fill_fg" as const, item })),
    ...lesson.fillBlanks.map((item) => ({ type: "fill_fr" as const, item })),
    ...lesson.quiz.map((item) => ({ type: "quiz" as const, item })),
  ];
  return shuffle(pool).slice(0, count);
}

interface Props {
  onBack: () => void;
}

export default function LessonPractice({ onBack }: Props) {
  const { lp, say } = useApp();
  const [stage, setStage] = useState<Stage>("select");
  const [expandedMilestone, setExpandedMilestone] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Session state
  const [exercises, setExercises] = useState<PracticeExercise[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const completedLessons = useMemo(() => {
    const set = new Set<number>();
    for (const lesson of LESSONS) {
      if (lp(lesson.id) > 0) set.add(lesson.id);
    }
    return set;
  }, [lp]);

  const startSession = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
    setExercises(buildExercises(lesson, 8));
    setIdx(0);
    setSelected(null);
    setScore(0);
    setStage("session");
  }, []);

  const restart = useCallback(() => {
    if (selectedLesson) startSession(selectedLesson);
  }, [selectedLesson, startSession]);

  /* ── LESSON SELECT ── */
  if (stage === "select") {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-3 pb-2">
          <Pressable onPress={onBack}>
            <Text className="text-xs font-semibold" style={{ color: P.ink3 }}>
              ← Back
            </Text>
          </Pressable>
          <Text
            className="flex-1 text-center font-newsreader text-base font-bold"
            style={{ fontStyle: "italic", color: P.ink }}
          >
            Lesson Practice
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
          {MILESTONES.map((m, mi) => {
            const isExpanded = expandedMilestone === mi;
            const hasCompleted = m.ids.some((id) => completedLessons.has(id));

            return (
              <View key={mi} className="mb-3">
                {/* Milestone header */}
                <Pressable
                  onPress={() => setExpandedMilestone(isExpanded ? -1 : mi)}
                  className="flex-row items-center rounded-xl px-4 py-3"
                  style={{
                    backgroundColor: P.paper,
                    borderWidth: 1,
                    borderColor: isExpanded ? P.red + "40" : P.border,
                  }}
                >
                  <Text className="text-base mr-2">{m.icon}</Text>
                  <View className="flex-1">
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: hasCompleted ? P.ink : P.ink3 }}
                    >
                      {m.title}
                    </Text>
                    <Text className="text-[10px]" style={{ color: P.ink3 }}>
                      {m.ids.filter((id) => completedLessons.has(id)).length}/
                      {m.ids.length} lessons available
                    </Text>
                  </View>
                  {isExpanded ? (
                    <ChevronDown size={16} color={P.ink3} />
                  ) : (
                    <ChevronRight size={16} color={P.ink3} />
                  )}
                </Pressable>

                {/* Lesson list */}
                {isExpanded && (
                  <View className="mt-1.5" style={{ gap: 6 }}>
                    {m.ids.map((lessonId) => {
                      const lesson = LESSONS.find((l) => l.id === lessonId);
                      if (!lesson) return null;
                      const completed = completedLessons.has(lessonId);
                      const progress = lp(lessonId);
                      const poolSize =
                        lesson.fillFG.length +
                        lesson.fillBlanks.length +
                        lesson.quiz.length;

                      return (
                        <Pressable
                          key={lessonId}
                          onPress={() => completed && startSession(lesson)}
                          disabled={!completed}
                          className="flex-row items-center rounded-lg px-4 py-3 ml-4"
                          style={{
                            backgroundColor: completed ? P.paper : P.bg,
                            borderWidth: 1,
                            borderColor: completed ? P.border : "transparent",
                            opacity: completed ? 1 : 0.5,
                          }}
                        >
                          {completed ? (
                            <BookOpen
                              size={16}
                              color={P.red}
                              strokeWidth={1.5}
                            />
                          ) : (
                            <Lock size={14} color={P.ink3} />
                          )}
                          <View className="flex-1 ml-3">
                            <Text
                              className="text-xs font-semibold"
                              style={{ color: completed ? P.ink : P.ink3 }}
                            >
                              L{lessonId} — {lesson.title}
                            </Text>
                            {completed && (
                              <Text
                                className="text-[10px]"
                                style={{ color: P.ink3 }}
                              >
                                {poolSize} exercises available
                              </Text>
                            )}
                          </View>
                          {completed && (
                            <View className="flex-row items-center" style={{ gap: 4 }}>
                              {/* Mini progress bar */}
                              <View
                                className="rounded-full overflow-hidden"
                                style={{
                                  width: 40,
                                  height: 4,
                                  backgroundColor: P.border,
                                }}
                              >
                                <View
                                  className="rounded-full"
                                  style={{
                                    width: `${Math.min(progress, 100)}%`,
                                    height: 4,
                                    backgroundColor: P.green,
                                  }}
                                />
                              </View>
                              <ChevronRight size={14} color={P.ink3} />
                            </View>
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ── DONE ── */
  if (stage === "done") {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-xl font-bold text-lm-green mb-2">
            Practice Complete!
          </Text>
          <Text className="text-sm text-lm-ink2 text-center mb-1">
            Score: {score} / {exercises.length}
          </Text>
          <Text className="text-xs text-lm-ink3 text-center mb-6">
            {selectedLesson?.title} — keep practicing to master every exercise!
          </Text>
          <Pressable
            onPress={restart}
            className="flex-row items-center rounded-xl px-5 py-3 mb-3"
            style={{ backgroundColor: P.red, gap: 6 }}
          >
            <RotateCcw size={14} color="#FFFFFF" />
            <Text className="text-white font-semibold text-sm">
              Shuffle & Try More
            </Text>
          </Pressable>
          <Pressable onPress={() => setStage("select")}>
            <Text className="text-sm font-semibold" style={{ color: P.ink3 }}>
              Choose Another Lesson
            </Text>
          </Pressable>
          <Pressable onPress={onBack} className="mt-2">
            <Text className="text-xs" style={{ color: P.ink3 }}>
              Back to Practice
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  /* ── SESSION ── */
  const ex = exercises[idx];
  if (!ex) {
    setStage("done");
    return null;
  }

  const handleAnswer = (answer: string) => {
    if (selected) return;
    setSelected(answer);

    if (norm(answer) === norm(ex.item.a)) {
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    if (idx + 1 >= exercises.length) {
      setStage("done");
    } else {
      setIdx(idx + 1);
      setSelected(null);
    }
  };

  const correctAnswer = ex.item.a;
  const isCorrect = selected ? norm(selected) === norm(correctAnswer) : null;

  // Build label & question based on exercise type
  let label = "";
  let question = "";
  let options: string[] = [];

  if (ex.type === "fill_fg") {
    label = "WEAVE FILL";
    question = ex.item.s;
    options = ex.item.o ?? [];
  } else if (ex.type === "fill_fr") {
    label = "FRENCH FILL";
    question = ex.item.s;
    options = ex.item.o ?? [];
  } else {
    label = "QUIZ";
    question = ex.item.q;
    options = ex.item.o ?? [];
  }

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-3 pb-2">
        <Pressable onPress={() => setStage("select")}>
          <Text className="text-xs font-semibold" style={{ color: P.ink3 }}>
            ← Back
          </Text>
        </Pressable>
        <Text className="text-xs" style={{ color: P.ink3 }}>
          {idx + 1} / {exercises.length}
        </Text>
        <Text className="text-xs" style={{ color: P.green }}>
          {score} correct
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        {/* Type label */}
        <Text
          className="text-[10px] uppercase mb-2 tracking-widest"
          style={{ color: P.red }}
        >
          {label}
        </Text>

        {/* Question */}
        <Text
          className="font-newsreader text-lg text-center mb-1"
          style={{ fontStyle: "italic", color: P.ink }}
        >
          {question}
        </Text>

        {/* Context */}
        {"ctx" in ex.item && ex.item.ctx && (
          <Text className="text-xs text-center mb-4" style={{ color: P.ink3 }}>
            {ex.item.ctx}
          </Text>
        )}

        {/* Options */}
        <View className="w-full mt-4" style={{ gap: 10 }}>
          {options.map((opt) => {
            const isThis = selected === opt;
            const isAnswer = norm(opt) === norm(correctAnswer);
            let bg: string = P.paper;
            let borderColor: string = P.border;

            if (selected) {
              if (isAnswer) {
                bg = P.gl;
                borderColor = P.green;
              } else if (isThis && !isAnswer) {
                bg = P.rl;
                borderColor = P.red;
              }
            }

            return (
              <Pressable
                key={opt}
                onPress={() => handleAnswer(opt)}
                disabled={!!selected}
                className="rounded-xl px-4 py-3"
                style={{
                  backgroundColor: bg,
                  borderWidth: 1.5,
                  borderColor,
                }}
              >
                <Text
                  className="font-newsreader text-sm text-center"
                  style={{ fontStyle: "italic", color: P.ink }}
                >
                  {opt}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Feedback + Next */}
        {selected && (
          <View className="items-center mt-4">
            <View className="flex-row items-center" style={{ gap: 4 }}>
              {isCorrect ? (
                <>
                  <Check size={14} color={P.green} />
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: P.green }}
                  >
                    Correct!
                  </Text>
                </>
              ) : (
                <>
                  <X size={14} color={P.red} />
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: P.red }}
                  >
                    Answer: {correctAnswer}
                  </Text>
                </>
              )}
            </View>

            {/* Listen */}
            <Pressable
              onPress={() => say(correctAnswer)}
              className="flex-row items-center mt-2 px-2.5 py-1.5 rounded"
              style={{ backgroundColor: "#F0EEEC", gap: 4 }}
            >
              <Volume2 size={12} color={P.ink3} />
              <Text className="text-[10px]" style={{ color: P.ink3 }}>
                Listen
              </Text>
            </Pressable>

            <Pressable
              onPress={next}
              className="rounded-xl px-6 py-3 mt-4"
              style={{ backgroundColor: P.red }}
            >
              <Text className="text-white text-sm font-semibold">Next</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
