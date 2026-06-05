import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { P } from "@/constants/theme";
import type {
  ExerciseBlueprint,
  LessonContract,
  RawItem,
} from "@/content/learning-engine";
import { LearnerLessonHeader } from "./LearnerLessonHeader";
import { RecognitionCard } from "./RecognitionCard";
import { FillCard } from "./FillCard";
import { BuildCard } from "./BuildCard";
import { RegisterSwitchCard } from "./RegisterSwitchCard";
import { ContextChainCard } from "./ContextChainCard";
import { BoundaryLaterFormCard } from "./BoundaryLaterFormCard";
import { isBoundaryLaterForm } from "@/content/learning-engine/boundary";
import { UnsupportedCard } from "./UnsupportedCard";
import { MonLexiqueShell } from "./MonLexiqueShell";
import { selectMonLexiqueEntries } from "@/content/learning-engine/mon-lexique";
import { PracticePoolShell } from "./PracticePoolShell";
import { PracticePoolPracticePanel } from "./PracticePoolPracticePanel";
import { selectPracticePoolBuckets, type PracticePoolItem } from "@/content/learning-engine/practice-pool";
import { selectReusablePracticeExercise } from "@/content/learning-engine/practice-reuse";
import { useLearningEngineSession, type LearnerSession } from "./useLearningEngineSession";

/**
 * Learner renderer shell (P3.6 + P3.7).
 *
 * Calm, premium, LABEL-FREE surface over a learning-engine fixture. It holds the
 * card-progression cursor and renders one card at a time (recognition, fill,
 * build, register_switch, context_chain); a tile-less build / future operation
 * shows a learner-safe placeholder. The exercise id is used only as a React key
 * (never shown).
 *
 * P3.6 wired the first event loop: on each Check (and on a recognition reveal),
 * the card hands its result up to the session controller, which builds a full
 * `LearningEvent` and appends it through a SERIALIZED queue. P3.7 closes the loop
 * locally — after each append settles the controller derives a `MasterySnapshot`
 * from all stored events and the hook mirrors it into `session.state`. The shell
 * surfaces only a tiny, non-technical save hint from `session.state.status`;
 * it NEVER renders the snapshot, item ids, counts, tags, or any mastery label.
 * Cards never touch `LocalRepository`. NO Mon Lexique / Practice Pool / Daily
 * Review, NO Supabase / network / AI. `grade()` still drives the visible feedback.
 *
 * P3.8 adds the soft boundary path: a `recognition` exercise whose targets are
 * recognition-only + production-blocked (see `isBoundaryLaterForm`) renders as a
 * calm "A form for later" card instead of a normal reveal — inline, never
 * gradeable, never asking the learner to produce the form. Its acknowledge reuses
 * the SAME recognition-reveal event path (no new event shape/operation).
 *
 * P4.3 surfaces a small Mon Lexique preview below the lesson: this shell (the
 * orchestration layer) runs the pure `selectMonLexiqueEntries` over the session's
 * `latestSnapshot` and hands learner-safe entries to the DUMB `MonLexiqueShell`.
 * Read-only — it writes nothing and reuses the existing snapshot (no new store /
 * no extra read). A null snapshot yields the calm empty state.
 *
 * P4.5 adds a Practice Pool preview the same way: the shell runs the pure
 * `selectPracticePoolBuckets` over the same snapshot and hands Build / Stretch /
 * Challenge buckets to the DUMB `PracticePoolShell`.
 *
 * P4.6 makes Practice Pool rows interactive WITHOUT generating content: tapping a
 * row resolves an EXISTING fixture exercise (pure `selectReusablePracticeExercise`)
 * and renders it with the SAME `renderCard` + session callbacks as the main
 * lesson flow, so graded attempts / reveals append through the existing serialized
 * controller. No new event shape, no new store, no direct `LocalRepository`. If no
 * existing exercise targets the item, a calm "not ready to practice yet" note
 * shows (no crash, no id leak). Selecting a row, closing the panel, and typing
 * never write events.
 */
const SAVE_HINT: Record<string, string | null> = {
  idle: null,
  saving: "Saving…",
  saved: "Progress saved locally.",
  error: "Couldn't save just now.",
};
function renderCard(
  ex: ExerciseBlueprint,
  items: Record<string, RawItem>,
  contract: LessonContract,
  session: LearnerSession,
) {
  switch (ex.operation) {
    case "recognition":
      // Boundary "later form" objects (recognition-only + production-blocked)
      // render as a soft preview, not a normal reveal — never gradeable. The
      // acknowledge reuses the same recognition-reveal event path, once.
      return isBoundaryLaterForm(ex, contract) ? (
        <BoundaryLaterFormCard
          key={ex.id}
          exercise={ex}
          items={items}
          onAcknowledge={() => session.recordRecognitionReveal({ exercise: ex })}
        />
      ) : (
        <RecognitionCard
          key={ex.id}
          exercise={ex}
          onReveal={() => session.recordRecognitionReveal({ exercise: ex })}
        />
      );
    case "fill":
      return (
        <FillCard
          key={ex.id}
          exercise={ex}
          onGradedAttempt={(p) =>
            session.recordGradedAttempt({ exercise: ex, ...p })
          }
        />
      );
    case "build":
      return ex.tiles && ex.tiles.length > 0 ? (
        <BuildCard
          key={ex.id}
          exercise={ex}
          items={items}
          onGradedAttempt={(p) =>
            session.recordGradedAttempt({ exercise: ex, ...p })
          }
        />
      ) : (
        <UnsupportedCard key={ex.id} />
      );
    case "register_switch":
      return (
        <RegisterSwitchCard
          key={ex.id}
          exercise={ex}
          onGradedAttempt={(p) =>
            session.recordGradedAttempt({ exercise: ex, ...p })
          }
        />
      );
    case "context_chain":
      return (
        <ContextChainCard
          key={ex.id}
          exercise={ex}
          onGradedAttempt={(p) =>
            session.recordGradedAttempt({ exercise: ex, ...p })
          }
        />
      );
    default:
      // Defensive: all current ExerciseBlueprint operations are handled above
      // (so `ex` is `never` here). Guards against a future operation variant.
      return <UnsupportedCard key="unsupported" />;
  }
}

export function LearnerRendererShell({
  canDo,
  exercises,
  items,
  contract,
  lessonId,
  contentVersion,
}: {
  canDo: string;
  exercises: ExerciseBlueprint[];
  items: Record<string, RawItem>;
  /** Contract for the fixture — used to classify boundary "later form" cards (P3.8). */
  contract: LessonContract;
  lessonId: string;
  contentVersion: string;
}) {
  const session = useLearningEngineSession({ lessonId, contentVersion });
  const [idx, setIdx] = useState(0);
  const total = exercises.length;
  const current = total > 0 ? exercises[idx] : undefined;

  // Orchestration-only: derive learner-safe Mon Lexique entries from the existing
  // session snapshot (null → empty state) and hand them to the dumb shell.
  const snapshot = session.state.latestSnapshot;
  const monLexiqueEntries = useMemo(
    () => (snapshot ? selectMonLexiqueEntries({ items, snapshot }) : []),
    [items, snapshot],
  );
  // Practice Pool preview (read-only). `now` comes from the snapshot's own
  // `updatedAt` (a stable, deterministic value already in state) so due-ordering
  // works without ever calling `Date.now` here or in the selector.
  const practiceBuckets = useMemo(
    () =>
      snapshot
        ? selectPracticePoolBuckets({
            snapshot,
            items,
            now: snapshot.updatedAt ?? undefined,
          })
        : { build: [], stretch: [], challenge: [] },
    [items, snapshot],
  );

  // P4.6: a tapped Practice Pool row resolves an EXISTING fixture exercise to
  // reuse; selecting/closing writes no events (only the reused card does, via
  // the same session callbacks the lesson flow uses).
  const [practiceExercise, setPracticeExercise] =
    useState<ExerciseBlueprint | null>(null);
  const [practiceUnavailable, setPracticeUnavailable] = useState(false);
  const openPractice = (item: PracticePoolItem) => {
    const reused = selectReusablePracticeExercise({
      item,
      exercises,
      path: item.path,
    });
    setPracticeExercise(reused);
    setPracticeUnavailable(reused === null);
  };
  const closePractice = () => {
    setPracticeExercise(null);
    setPracticeUnavailable(false);
  };

  return (
    <View style={screen}>
      {/* M-1: scrollable body so the card + nav + Mon Lexique + Practice Pool +
          practice panel all stay reachable on small viewports. Children must NOT
          use flex:1 inside a vertical ScrollView; the card area sizes to content
          and `contentContainerStyle` (flexGrow:1 + bottom padding) lets the
          placeholder still center when content is short. `keyboardShouldPersistTaps`
          keeps Check/Next tappable while a TextInput keyboard is open. */}
      <ScrollView
        style={scroll}
        contentContainerStyle={bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        <LearnerLessonHeader canDo={canDo} />

        {current ? (
          <>
            <Text style={countText}>
              Card {idx + 1} of {total}
            </Text>

            <View>{renderCard(current, items, contract, session)}</View>

            <View style={navRow}>
              <Pressable
                disabled={idx === 0}
                onPress={() => setIdx((i) => Math.max(0, i - 1))}
                style={[navBtn, idx === 0 ? dimmed : null]}
              >
                <Text style={navText}>Back</Text>
              </Pressable>
              <Pressable
                disabled={idx >= total - 1}
                onPress={() => setIdx((i) => Math.min(total - 1, i + 1))}
                style={[navBtn, idx >= total - 1 ? dimmed : null]}
              >
                <Text style={navText}>Next</Text>
              </Pressable>
            </View>

            {SAVE_HINT[session.state.status] ? (
              <Text style={saveHint}>{SAVE_HINT[session.state.status]}</Text>
            ) : null}

            <MonLexiqueShell entries={monLexiqueEntries} />
            <PracticePoolShell
              buckets={practiceBuckets}
              onSelectItem={openPractice}
            />

            {practiceExercise ? (
              <PracticePoolPracticePanel onClose={closePractice}>
                {renderCard(practiceExercise, items, contract, session)}
              </PracticePoolPracticePanel>
            ) : practiceUnavailable ? (
              <View style={practiceNote}>
                <Text style={saveHint}>
                  This one isn&rsquo;t ready to practice yet.
                </Text>
                <Pressable onPress={closePractice} style={navBtn}>
                  <Text style={navText}>Close</Text>
                </Pressable>
              </View>
            ) : null}
          </>
        ) : (
          <View style={placeholderArea}>
            <View style={placeholderCard}>
              <Text style={placeholderKicker}>Coming up</Text>
              <Text style={placeholderBody}>
                Your first card will appear here.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const screen: ViewStyle = { flex: 1, backgroundColor: P.bg, paddingTop: 64 };
const scroll: ViewStyle = { flex: 1 };
const bodyContent: ViewStyle = {
  paddingHorizontal: 20,
  // Extra bottom padding so the last element (Practice Pool panel / its Check
  // button) is comfortably scrollable into view above the screen edge.
  paddingBottom: 48,
  gap: 16,
  // Fill the viewport when content is short so the placeholder can still center.
  flexGrow: 1,
};
const countText: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  fontFamily: "Outfit",
};
const navRow: ViewStyle = { flexDirection: "row", justifyContent: "space-between" };
const navBtn: ViewStyle = {
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.border,
  paddingHorizontal: 20,
  paddingVertical: 9,
};
const dimmed: ViewStyle = { opacity: 0.4 };
const navText: TextStyle = { color: P.ink2, fontSize: 14, fontFamily: "Outfit" };
const saveHint: TextStyle = {
  color: P.ink3,
  fontSize: 12,
  fontFamily: "Outfit",
  textAlign: "center",
};
const practiceNote: ViewStyle = { gap: 8, alignItems: "flex-start" };
const placeholderArea: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};
const placeholderCard: ViewStyle = {
  width: "100%",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  padding: 24,
  gap: 6,
};
const placeholderKicker: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  fontFamily: "Outfit",
};
const placeholderBody: TextStyle = {
  color: P.ink2,
  fontSize: 16,
  lineHeight: 24,
  fontFamily: "Newsreader",
};
