import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, Check } from "lucide-react-native";
import { useApp } from "@/providers/AppProvider";
import { LESSONS } from "@/data/lessons";
import { SECS, SEC_NAMES } from "@/constants/sections";
import { P } from "@/constants/theme";
import { TransitionScreen } from "@/components/TransitionScreen";

// Section components
import { ReadListen } from "@/components/sections/ReadListen";
import { Patterns } from "@/components/sections/Patterns";
import { FranglaisFill } from "@/components/sections/FranglaisFill";
import { FrenchFill } from "@/components/sections/FrenchFill";
import { WriteSection } from "@/components/sections/WriteSection";
import { BuildSentence } from "@/components/sections/BuildSentence";
import { Quiz } from "@/components/sections/Quiz";
import { CombineFranglais } from "@/components/sections/CombineFranglais";
import { SayItYourWay } from "@/components/sections/SayItYourWay";
import { MiniConversation } from "@/components/sections/MiniConversation";
import { Review } from "@/components/sections/Review";

interface TransitionData {
  score: number;
  total: number;
  msg: string;
  next: number;
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lessonId = parseInt(id || "1", 10);
  const lesson = LESSONS.find((l) => l.id === lessonId);

  const { mk, gx, lp, logErr, say, prog } = useApp();

  const [sec, setSec] = useState(0);
  const [trans, setTrans] = useState<TransitionData | null>(null);

  if (!lesson) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <Text className="text-lm-ink">Lesson not found</Text>
      </SafeAreaView>
    );
  }

  const nextSec = (score: number, total: number, msg: string) => {
    setTrans({ score, total, msg, next: sec + 1 });
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
              nextSec(0, 0, "Patterns understood! Time to fill in some Franglais...");
            }}
          />
        );
      case 2:
        return (
          <FranglaisFill
            items={lesson.fillFG}
            onComplete={(score, total) => {
              mk(lessonId, "fill_fg");
              gx(15);
              nextSec(score, total, "Nice Franglais! Now try fully in French...");
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
              nextSec(score, total, "Well done! Now write from memory...");
            }}
            onError={errFill}
          />
        );
      case 4:
        return (
          <WriteSection
            items={lesson.fillBlanks}
            onComplete={(score, total) => {
              mk(lessonId, "fill_write");
              gx(15);
              nextSec(score, total, "Great writing! Now build some sentences...");
            }}
            onError={errFill}
          />
        );
      case 5:
        return (
          <BuildSentence
            items={lesson.buildSentences}
            onComplete={(score, total) => {
              mk(lessonId, "build");
              gx(15);
              nextSec(score, total, "Sentences built! Time for a quiz...");
            }}
            onError={errBuild}
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
          <CombineFranglais
            combine={lesson.combine}
            franglais={lesson.franglais}
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
          />
        ) : sec > 10 ? (
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-xl font-bold text-lm-green mb-2">
              Lesson Complete!
            </Text>
            <Text className="text-sm text-lm-ink2 text-center mb-4">
              You've completed all sections. Great job!
            </Text>
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
              className="bg-lm-green rounded-xl px-6 py-3"
            >
              <Text className="text-white font-semibold">Back to Journey</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
            {renderSection()}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
