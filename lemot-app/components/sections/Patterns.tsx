import { useState } from "react";
import { View, Text } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { GrammarRenderer } from "@/components/GrammarRenderer";
import { MCQ } from "@/components/MCQ";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { Grammar } from "@/lib/types";

interface PatternsProps {
  grammar: Grammar;
  onComplete: () => void;
  say: (text: string) => void;
}

/**
 * Section 1: Patterns
 *
 * Renders grammar explanation sections (intro, tip, block, conjugation, etc.)
 * using the GrammarRenderer. If the grammar has a quickRecall question,
 * it shows a mini MCQ before letting the user continue.
 */
export function Patterns({ grammar, onComplete, say }: PatternsProps) {
  const [quickRecallAnswer, setQuickRecallAnswer] = useState<string | null>(
    null
  );

  const hasQuickRecall = !!grammar.quickRecall;
  const quickRecallDone = quickRecallAnswer !== null;

  return (
    <View
      className="rounded-xl border"
      style={{
        backgroundColor: P.paper,
        borderColor: P.border,
        padding: 20,
      }}
    >
      {/* Grammar title */}
      <Text
        className="text-lg font-semibold mb-3.5"
        style={{ fontFamily: "serif", color: P.ink }}
      >
        {grammar.title}
      </Text>

      {/* Grammar sections */}
      <GrammarRenderer sections={grammar.sections} onSpeak={say} />

      {/* Quick Recall MCQ */}
      {hasQuickRecall && !quickRecallDone && (
        <View
          className="mt-4 rounded-xl border"
          style={{
            backgroundColor: "#FAFAF8",
            borderColor: P.border,
            padding: 14,
          }}
        >
          <Text
            className="text-xs font-semibold mb-2"
            style={{ color: P.ink3 }}
          >
            Quick Recall
          </Text>
          <Text
            className="text-sm font-semibold mb-2.5"
            style={{ color: P.ink }}
          >
            {grammar.quickRecall!.q}
          </Text>
          <MCQ
            options={grammar.quickRecall!.o}
            correct={grammar.quickRecall!.a}
            selected={quickRecallAnswer}
            onSelect={(opt) => setQuickRecallAnswer(opt)}
          />
        </View>
      )}

      {/* Continue button: always visible, but label changes based on quickRecall state */}
      <Btn onPress={onComplete}>
        <Text className="text-white text-sm font-semibold">
          {quickRecallDone ? "Got it, next" : "Continue"}
        </Text>
        <ArrowRight size={15} color="#fff" />
      </Btn>
    </View>
  );
}
