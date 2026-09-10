import { View, Text, ScrollView } from "react-native";
import { P, SPACE } from "@/constants/theme";
import { PrimaryAction } from "@/components/ui/actions";
import {
  PRACTICE_UI_COPY,
  previewLine,
  territoryLine,
} from "@/content/practice/practiceCopy";
import type { PracticeSessionAction } from "@/content/practice/practicePlanner";
import type { PracticeMode } from "@/content/practice/practiceModes";
import { Pressable } from "react-native";
import { V1_LESSONS } from "@/content/lessons/v1";

/**
 * The Practice entry.
 *
 * One headline, one honest line about the session, one button. That original
 * reasoning stands and is why there is still no menu in front of the default
 * path: deciding what a learner needs is the selector's job, and asking them to
 * choose it is asking them to do the part they cannot do.
 *
 * What changed is that a learner sometimes arrives WITH an intention — "the
 * things I keep getting wrong", "the lesson I just did". Those are two quiet
 * secondary entries beneath the main action, not a fork placed before every
 * session. Errors names how much is actually waiting, and offers nothing when
 * nothing is.
 */
export function PracticeStart({
  actions,
  onStart,
  mode,
  onModeChange,
  errorsAvailable,
  reachedLessonNumbers,
}: {
  actions: readonly PracticeSessionAction[];
  onStart: () => void;
  mode: PracticeMode;
  onModeChange: (mode: PracticeMode, lessonId?: string) => void;
  errorsAvailable: boolean;
  reachedLessonNumbers: readonly number[];
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SPACE.xl,
          paddingTop: SPACE.xxl,
          paddingBottom: SPACE.xxl,
        }}
      >
        <Text
          style={{
            color: P.ink,
            fontFamily: "serif",
            fontSize: 28,
            lineHeight: 36,
          }}
        >
          {PRACTICE_UI_COPY.startHeadline}
        </Text>
        <Text
          style={{
            color: P.ink2,
            fontSize: 15,
            lineHeight: 23,
            marginTop: SPACE.md,
          }}
        >
          {PRACTICE_UI_COPY.startBlurb}
        </Text>

        <View
          style={{
            marginTop: SPACE.xxl,
            paddingTop: SPACE.lg,
            borderTopWidth: 1,
            borderTopColor: P.border,
          }}
        >
          <Text style={{ color: P.ink3, fontSize: 12, letterSpacing: 0.3 }}>
            {PRACTICE_UI_COPY.startTodayLabel}
          </Text>
          <Text
            style={{
              color: P.ink,
              fontSize: 17,
              lineHeight: 25,
              marginTop: SPACE.sm,
            }}
          >
            {previewLine(actions)}
          </Text>
          {/*
            What the session is ABOUT, in capabilities rather than French — a
            preview that printed the sentences would make the first half of
            every session a reading exercise.
          */}
          {territoryLine(actions).length > 0 && (
            <Text
              style={{
                color: P.ink2,
                fontSize: 14,
                lineHeight: 22,
                marginTop: SPACE.md,
              }}
            >
              {territoryLine(actions)}
            </Text>
          )}
        </View>

        {/*
          Two quiet ways in for a learner who arrived with an intention. Not a
          fork before every session: the main action below is still the default
          path, and these sit under it in secondary type.
        */}
        <View
          style={{
            marginTop: SPACE.xxl,
            paddingTop: SPACE.lg,
            borderTopWidth: 1,
            borderTopColor: P.border,
          }}
        >
          <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 17, letterSpacing: 0.3 }}>
            {PRACTICE_UI_COPY.modesLabel}
          </Text>

          <ModeRow
            label={PRACTICE_UI_COPY.modeErrors}
            detail={
              errorsAvailable
                ? PRACTICE_UI_COPY.modeErrorsDetail
                : PRACTICE_UI_COPY.modeErrorsEmpty
            }
            selected={mode === "errors"}
            disabled={!errorsAvailable}
            onPress={() => onModeChange("errors")}
          />

          <ModeRow
            label={PRACTICE_UI_COPY.modeLesson}
            detail={
              reachedLessonNumbers.length > 0
                ? `${reachedLessonNumbers.length} to choose from.`
                : PRACTICE_UI_COPY.modeLessonEmpty
            }
            selected={mode === "byLesson"}
            disabled={reachedLessonNumbers.length === 0}
            onPress={() => {
              const last = reachedLessonNumbers[reachedLessonNumbers.length - 1];
              const lesson = (V1_LESSONS as { id: string; number: number }[]).find(
                (l) => l.number === last,
              );
              if (lesson) onModeChange("byLesson", lesson.id);
            }}
          />

          {mode !== "freestyle" && (
            <ModeRow
              label={PRACTICE_UI_COPY.modeFreestyle}
              detail={PRACTICE_UI_COPY.modeFreestyleDetail}
              selected={false}
              disabled={false}
              onPress={() => onModeChange("freestyle")}
            />
          )}
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: SPACE.xl,
          paddingBottom: SPACE.xl,
          paddingTop: SPACE.md,
        }}
      >
        <PrimaryAction
          label={PRACTICE_UI_COPY.startAction}
          onPress={onStart}
          disabled={actions.length === 0}
        />
      </View>
    </View>
  );
}

/** One quiet secondary entry. Calm, never a reward tile. */
function ModeRow({
  label,
  detail,
  selected,
  disabled,
  onPress,
}: {
  label: string;
  detail: string;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      style={{
        marginTop: SPACE.md,
        paddingVertical: SPACE.sm,
        opacity: disabled ? 0.45 : 1,
      }}
    >
      <Text
        style={{
          color: selected ? P.red : P.ink,
          fontSize: 16,
          lineHeight: 23,
          fontWeight: selected ? "600" : "400",
        }}
      >
        {label}
      </Text>
      <Text style={{ color: P.ink3, fontSize: 13, lineHeight: 19, marginTop: 1 }}>
        {detail}
      </Text>
    </Pressable>
  );
}
