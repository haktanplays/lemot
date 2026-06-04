import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type {
  PracticePoolBuckets,
  PracticePoolItem,
} from "@/content/learning-engine/practice-pool";
import { PracticePoolItemRow } from "./PracticePoolItemRow";

/**
 * Practice Pool learner shell (P4.5) — DUMB, learner-facing presentation.
 *
 * Receives already-selected `buckets` (the orchestration layer —
 * `LearnerRendererShell` — runs the pure `selectPracticePoolBuckets` and hands
 * them down) and renders the three calm paths, each with a count and a small
 * preview, or a calm empty state when every bucket is empty. It owns no store,
 * derives nothing, writes no events, calls no `scoreEvents`, and never touches
 * `LocalRepository`.
 *
 * P4.5 is READ-ONLY: it previews suggestions only — no practice/exercise
 * execution, no "start" interaction (that is P4.6). The Challenge path is framed
 * gently ("Needs another look"), never "failed" / "wrong" / "weakness". No
 * gamification / streak / XP. No Daily Review / Word Graph / notes.
 */
const PREVIEW_LIMIT = 3;

export function PracticePoolShell({ buckets }: { buckets: PracticePoolBuckets }) {
  const total =
    buckets.build.length + buckets.stretch.length + buckets.challenge.length;

  return (
    <View style={section}>
      <Text style={title}>Practice Pool</Text>
      {total === 0 ? (
        <Text style={empty}>
          Practice suggestions will appear as you use more French.
        </Text>
      ) : (
        <View style={paths}>
          <PathBlock label="Build" items={buckets.build} accent={P.ink2} />
          <PathBlock label="Stretch" items={buckets.stretch} accent={P.purple} />
          <PathBlock
            label="Needs another look"
            items={buckets.challenge}
            accent={P.amber}
          />
        </View>
      )}
    </View>
  );
}

/** Dumb sub-section: one path's calm label + count + a short preview. */
function PathBlock({
  label,
  items,
  accent,
}: {
  label: string;
  items: PracticePoolItem[];
  accent: string;
}) {
  if (items.length === 0) return null; // hide empty paths; overall empty state covers all-empty
  const preview = items.slice(0, PREVIEW_LIMIT);
  const extra = items.length - preview.length;
  return (
    <View style={path}>
      <Text style={[pathLabel, { color: accent }]}>
        {label} · {items.length}
      </Text>
      <View style={list}>
        {preview.map((item) => (
          <PracticePoolItemRow key={item.itemId} item={item} />
        ))}
      </View>
      {extra > 0 ? <Text style={more}>+{extra} more</Text> : null}
    </View>
  );
}

const section: ViewStyle = {
  gap: 10,
  borderTopWidth: 1,
  borderTopColor: P.border,
  paddingTop: 14,
};
const title: TextStyle = {
  color: P.ink3,
  fontSize: 12,
  letterSpacing: 1,
  fontFamily: "Outfit",
  textTransform: "uppercase",
};
const empty: TextStyle = {
  color: P.ink3,
  fontSize: 14,
  lineHeight: 20,
  fontFamily: "Newsreader",
};
const paths: ViewStyle = { gap: 14 };
const path: ViewStyle = { gap: 6 };
const pathLabel: TextStyle = {
  fontSize: 13,
  fontFamily: "Outfit",
};
const list: ViewStyle = { gap: 6 };
const more: TextStyle = { color: P.ink3, fontSize: 12, fontFamily: "Outfit" };
