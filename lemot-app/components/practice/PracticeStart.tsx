import { View, Text, ScrollView, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { P, SPACE } from "@/constants/theme";
import { QuietAction } from "@/components/ui/actions";
import { PRACTICE_UI_COPY, browseModeCopy } from "@/content/practice/practiceCopy";
import type { PracticeSessionAction } from "@/content/practice/practicePlanner";
import type { BrowseMode } from "@/content/practice/practiceBrowse";
import { BROWSE_MODES } from "@/content/practice/practiceBrowse";
import type { PracticeSeed } from "@/content/practice/practiceTypes";
import { PracticeCard } from "./PracticeCard";

/**
 * The Practice entry.
 *
 * WHAT IT USED TO SAY, and why that was the bug:
 *
 *     Keep the French moving.
 *     7 things to bring back.
 *     Start practice.
 *
 * That is Daily Review's sentence. A set already chosen, its size announced,
 * one tap to accept it. The two surfaces are meant to be a pair and had
 * collapsed into one — Cairn chooses the review; the learner chooses HERE, out
 * of an inventory that runs to two hundred and fifty-one lawful practices for a
 * learner six lessons in. They were seeing eight of them and concluding that
 * was Practice.
 *
 * So the entry asks instead of announcing, and it answers the question it asks
 * with REAL CARDS rather than a menu of category names. "A step further" means
 * nothing until you see the scene it would put you in.
 *
 * The bounded session is not deleted. It sits at the bottom, named for what it
 * is, as ONE thing a learner may want rather than the definition of Practice.
 */
export function PracticeStart({
  actions,
  onStart,
  tasters,
  poolSizes,
  lessonTitleOf,
  onOpenMode,
  onOpenTaster,
}: {
  /** The bounded planner session, still available, no longer the whole screen. */
  actions: readonly PracticeSessionAction[];
  onStart: () => void;
  /** One real, lawful card per mode that has anything in it. */
  tasters: readonly { mode: BrowseMode; seed: PracticeSeed }[];
  /** Which modes have material, so an empty one is honest rather than hidden. */
  poolSizes: Readonly<Record<BrowseMode, number>>;
  lessonTitleOf: (lessonId: string) => string | undefined;
  onOpenMode: (mode: BrowseMode) => void;
  onOpenTaster: (mode: BrowseMode, seedId: string) => void;
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
        <Text style={{ color: P.ink, fontFamily: "serif", fontSize: 28, lineHeight: 36 }}>
          {PRACTICE_UI_COPY.startHeadline}
        </Text>
        <Text
          style={{ color: P.ink2, fontSize: 15, lineHeight: 23, marginTop: SPACE.md }}
        >
          {PRACTICE_UI_COPY.startBlurb}
        </Text>

        {/* Live examples, drawn from different modes, so the first viewport is
            things to do rather than a description of things to do. */}
        {tasters.length > 0 && (
          <View style={{ marginTop: SPACE.xxl }}>
            <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 17, letterSpacing: 0.3 }}>
              {PRACTICE_UI_COPY.tasterLabel}
            </Text>
            <View style={{ gap: SPACE.md, marginTop: SPACE.md }}>
              {tasters.map(({ mode, seed }) => (
                <PracticeCard
                  key={seed.id}
                  seed={seed}
                  lessonTitle={lessonTitleOf(seed.originLessonId)}
                  onPress={() => onOpenTaster(mode, seed.id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* The four jobs. Rows, not tiles: no colour blocks, no icons, no
            counts. A mode with nothing in it still shows, greyed, saying so. */}
        <View
          style={{
            marginTop: SPACE.xxl,
            paddingTop: SPACE.lg,
            borderTopWidth: 1,
            borderTopColor: P.border,
          }}
        >
          <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 17, letterSpacing: 0.3 }}>
            {PRACTICE_UI_COPY.browseLabel}
          </Text>
          {BROWSE_MODES.map((mode) => {
            const copy = browseModeCopy(mode);
            const empty = poolSizes[mode] === 0 && mode !== "byLesson";
            return (
              <ModeRow
                key={mode}
                label={copy.label}
                detail={empty ? (copy.empty ?? copy.detail) : copy.detail}
                disabled={empty}
                onPress={() => onOpenMode(mode)}
              />
            );
          })}
        </View>

        {/* The bounded session, preserved and demoted. */}
        <View
          style={{
            marginTop: SPACE.xxl,
            paddingTop: SPACE.lg,
            borderTopWidth: 1,
            borderTopColor: P.border,
          }}
        >
          <Text style={{ color: P.ink2, fontSize: 15, lineHeight: 23 }}>
            {PRACTICE_UI_COPY.browseSessionLabel}
          </Text>
          <Text
            style={{ color: P.ink3, fontSize: 13, lineHeight: 19, marginTop: 2 }}
          >
            {PRACTICE_UI_COPY.browseSessionDetail}
          </Text>
          <View style={{ marginTop: SPACE.md }}>
            <QuietAction
              label={PRACTICE_UI_COPY.startAction}
              onPress={onStart}
              disabled={actions.length === 0}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/** One quiet way in. Calm, never a reward tile. */
function ModeRow({
  label,
  detail,
  disabled,
  onPress,
}: {
  label: string;
  detail: string;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: SPACE.md,
        marginTop: SPACE.md,
        paddingVertical: SPACE.sm,
        opacity: disabled ? 0.45 : 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: P.ink, fontSize: 16, lineHeight: 23 }}>{label}</Text>
        <Text style={{ color: P.ink3, fontSize: 13, lineHeight: 19, marginTop: 1 }}>
          {detail}
        </Text>
      </View>
      {disabled ? null : <ChevronRight size={18} color={P.ink3} />}
    </Pressable>
  );
}
