import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { Headphones, ArrowRight } from "lucide-react-native";
import { Btn } from "@/components/Btn";
import { MCQ } from "@/components/MCQ";
import { P } from "@/constants/theme";
import { norm } from "@/lib/normalize";
import type { ReviewItem, FranglaisBlank } from "@/lib/types";

interface ReviewProps {
  items: ReviewItem[];
  onComplete: (score: number, total: number) => void;
  onError: (correct: string, given: string) => void;
  say: (text: string) => void;
}

/**
 * Section 10: Review
 *
 * Mixed-format final review covering listen, odd-one-out, context match,
 * fill-with-context, and franglais blanks. Tracks score across all items
 * and reports it on completion.
 */
export function Review({ items, onComplete, onError, say }: ReviewProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Franglais blanks state: tracks text input and done status per blank
  const [fgInputs, setFgInputs] = useState<Record<string, string>>({});
  const [fgDone, setFgDone] = useState<Record<string, boolean>>({});

  const current = items[index];
  if (!current) return null;

  const isLast = index >= items.length - 1;
  const totalScorable = items.length;

  /** Handle MCQ answer selection */
  function handleSelect(option: string, correct: string) {
    setSelected(option);
    if (option === correct) {
      setScore((s) => s + 1);
    } else {
      onError(correct, option);
    }
  }

  /** Advance to next item or finish */
  function advance() {
    if (isLast) {
      onComplete(score, totalScorable);
    } else {
      setIndex(index + 1);
      setSelected(null);
      setFgInputs({});
      setFgDone({});
    }
  }

  /** Handle franglais blank check */
  function checkFranglaisBlank(blank: FranglaisBlank, blankIndex: number) {
    const key = `rv${blankIndex}`;
    const textKey = `rvt${blankIndex}`;
    const userInput = fgInputs[textKey] || "";

    if (norm(userInput) === norm(blank.answer)) {
      setFgDone((prev) => ({ ...prev, [key]: true }));
      setScore((s) => s + 1);
    } else {
      // Show correct answer
      setFgInputs((prev) => ({ ...prev, [textKey]: blank.answer }));
      setFgDone((prev) => ({ ...prev, [key]: true }));
      onError(blank.answer, userInput);
    }
  }

  /** Shared "Next / Complete" button for MCQ-based items */
  function renderNextButton() {
    if (!selected) return null;
    return (
      <Btn onPress={advance}>
        <Text className="text-white text-sm font-semibold">
          {isLast ? "Complete!" : "Next"}
        </Text>
        <ArrowRight size={15} color="#fff" />
      </Btn>
    );
  }

  return (
    <ScrollView>
      {/* Header */}
      <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
        Review {index + 1}/{items.length}
      </Text>
      <Text className="text-xs mb-3" style={{ color: P.ink2 }}>
        Mixed questions -- expect anything!
      </Text>

      <View
        className="rounded-2xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 20,
        }}
      >
        {/* ── Listen type ── */}
        {current.type === "listen" && (
          <View>
            {/* Play button */}
            <View className="items-center mb-3.5">
              <Pressable
                onPress={() => say(current.audio)}
                className="rounded-full items-center justify-center"
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "#0369A1",
                }}
              >
                <Headphones size={24} color="#fff" strokeWidth={1.5} />
              </Pressable>
              <Text className="text-xs mt-2" style={{ color: P.ink3 }}>
                Tap to listen
              </Text>
            </View>

            {/* Question */}
            <Text
              className="text-sm font-semibold text-center mb-3"
              style={{ color: P.ink }}
            >
              {current.q}
            </Text>

            {/* MCQ */}
            <MCQ
              options={current.o}
              correct={current.a}
              selected={selected}
              onSelect={(v) => handleSelect(v, current.a)}
            />

            {renderNextButton()}
          </View>
        )}

        {/* ── Odd one out ── */}
        {current.type === "odd" && (
          <View>
            <Text
              className="text-sm font-semibold text-center mb-3"
              style={{ color: P.ink }}
            >
              {current.q}
            </Text>

            <MCQ
              options={current.items}
              correct={current.a}
              selected={selected}
              onSelect={(v) => handleSelect(v, current.a)}
            />

            {/* Show reason after answering */}
            {selected && (
              <Text
                className="text-xs italic mt-2"
                style={{ color: P.ink3 }}
              >
                {current.reason}
              </Text>
            )}

            {renderNextButton()}
          </View>
        )}

        {/* ── Context match ── */}
        {current.type === "context" && (
          <View>
            <Text
              className="text-xs italic mb-1.5"
              style={{ color: P.amber }}
            >
              {current.situation}
            </Text>
            <Text
              className="text-sm font-semibold mb-3"
              style={{ color: P.ink }}
            >
              What would you say?
            </Text>

            <MCQ
              options={current.o}
              correct={current.a}
              selected={selected}
              onSelect={(v) => handleSelect(v, current.a)}
            />

            {renderNextButton()}
          </View>
        )}

        {/* ── Fill with context ── */}
        {current.type === "fill_ctx" && (
          <View>
            {current.ctx ? (
              <Text
                className="text-xs italic mb-2"
                style={{ color: P.amber }}
              >
                {current.ctx}
              </Text>
            ) : null}

            <Text
              className="text-center mb-3"
              style={{
                fontSize: 17,
                fontFamily: "serif",
                fontWeight: "500",
                color: P.ink,
              }}
            >
              {current.s}
            </Text>

            <MCQ
              options={current.o}
              correct={current.a}
              selected={selected}
              onSelect={(v) => handleSelect(v, current.a)}
            />

            {renderNextButton()}
          </View>
        )}

        {/* ── Franglais blanks ── */}
        {current.type === "franglais" && "blanks" in current && (
          <FranglaisReview
            item={current as { type: "franglais"; en: string; blanks: FranglaisBlank[]; full: string }}
            fgInputs={fgInputs}
            fgDone={fgDone}
            onInputChange={(key, value) =>
              setFgInputs((prev) => ({ ...prev, [key]: value }))
            }
            onCheck={(blank, i) => checkFranglaisBlank(blank, i)}
            onAdvance={advance}
            isLast={isLast}
          />
        )}
      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────────────────
// Franglais sub-component (kept in same file for cohesion)
// ─────────────────────────────────────────────────────────────

interface FranglaisReviewProps {
  item: { type: "franglais"; en: string; blanks: FranglaisBlank[]; full: string };
  fgInputs: Record<string, string>;
  fgDone: Record<string, boolean>;
  onInputChange: (key: string, value: string) => void;
  onCheck: (blank: FranglaisBlank, index: number) => void;
  onAdvance: () => void;
  isLast: boolean;
}

function FranglaisReview({
  item,
  fgInputs,
  fgDone,
  onInputChange,
  onCheck,
  onAdvance,
  isLast,
}: FranglaisReviewProps) {
  const allDone = item.blanks.every((_, i) => fgDone[`rv${i}`]);

  return (
    <View>
      {/* English sentence */}
      <Text
        className="text-sm text-center mb-2.5"
        style={{ color: P.ink }}
      >
        {item.en}
      </Text>

      {/* Blank rows */}
      {item.blanks.map((blank, i) => {
        const doneKey = `rv${i}`;
        const textKey = `rvt${i}`;
        const isDone = !!fgDone[doneKey];

        return (
          <View
            key={i}
            className="rounded-lg mb-1.5 flex-row items-center"
            style={{
              padding: 10,
              backgroundColor: isDone ? P.gl : "#F5F5F4",
            }}
          >
            {/* English word label */}
            <Text className="text-xs" style={{ color: P.ink3 }}>
              {blank.word} {"\u2192"}
            </Text>

            {!isDone ? (
              <View className="flex-row items-center flex-1 ml-1.5">
                <TextInput
                  value={fgInputs[textKey] || ""}
                  onChangeText={(v) => onInputChange(textKey, v)}
                  placeholder="French..."
                  placeholderTextColor={P.ink3}
                  className="rounded-md"
                  style={{
                    flex: 1,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    borderColor: P.border,
                    fontSize: 12,
                    fontFamily: "serif",
                    fontStyle: "italic",
                    color: P.ink,
                    backgroundColor: P.paper,
                  }}
                />
                <Pressable
                  onPress={() => onCheck(blank, i)}
                  className="rounded-md ml-1"
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    backgroundColor: P.red,
                  }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: "#fff" }}
                  >
                    Go
                  </Text>
                </Pressable>
              </View>
            ) : (
              <Text
                className="text-sm font-semibold ml-1.5"
                style={{
                  color: P.green,
                  fontFamily: "serif",
                  fontStyle: "italic",
                }}
              >
                {blank.answer}
              </Text>
            )}
          </View>
        );
      })}

      {/* Advance button when all blanks complete */}
      {allDone && (
        <Btn onPress={onAdvance} color={P.green}>
          <Text className="text-white text-sm font-semibold">
            {isLast ? "Complete!" : "Next"}
          </Text>
          <ArrowRight size={15} color="#fff" />
        </Btn>
      )}
    </View>
  );
}
