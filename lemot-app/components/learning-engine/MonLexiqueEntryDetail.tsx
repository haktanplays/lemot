/**
 * What Mon Lexique remembers about one word.
 *
 * The list answers "what French do I have". This answers "what is this piece,
 * and where did it come from", which is the question a learner taps a word to
 * ask. It is a memory surface, not a mastery table, so it says nothing that
 * needs a number.
 *
 * Deliberately NOT shown, however available: counters, attempts, `dueAt`, the
 * Leitner box, `practiceEligibility` as a word, weak tags, item ids, or the
 * registry's `meaning` field -- that last one is authoring prose ("First-person
 * 'to be' -- identity, state, location.") and belongs to authors, not learners.
 *
 * "Practise this" appears only when the piece is actually output-eligible, and
 * it routes to Practice on the lesson where the piece was met. It does not
 * invent a single-item practice mode that does not exist.
 */
import { View, Text, Pressable } from "react-native";
import { Volume2 } from "lucide-react-native";
import { P, SPACE, frenchLineHeight } from "@/constants/theme";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import type { MonLexiqueEntry } from "@/content/learning-engine/mon-lexique";

type RegistryRow = {
  en?: string;
  exampleFr?: string;
  exampleEn?: string;
  relatedItemIds?: readonly string[];
  type?: string;
};

const REGISTRY = ITEM_REGISTRY as unknown as Record<string, RegistryRow>;

/** Pieces a learner is never shown as a related piece. */
const NON_SURFACE = new Set(["grammar-nugget", "sound-pattern", "micro-contrast"]);

export function MonLexiqueEntryDetail({
  entry,
  metIn,
  reachedItemIds,
  onSay,
  onPractise,
}: {
  entry: MonLexiqueEntry;
  /** Learner-facing title of the lesson that teaches this piece, if known. */
  metIn?: string;
  /** Everything the learner has reached, so related pieces cannot leak ahead. */
  reachedItemIds: ReadonlySet<string>;
  onSay: (text: string) => void;
  /** Present only when this piece is output-eligible. */
  onPractise?: () => void;
}) {
  const item = REGISTRY[entry.itemId] ?? {};
  const related = (item.relatedItemIds ?? [])
    .filter((id) => reachedItemIds.has(id))
    .map((id) => REGISTRY[id])
    .filter((r): r is RegistryRow => Boolean(r) && !NON_SURFACE.has(String(r?.type)))
    .slice(0, 4);

  return (
    <View
      style={{
        backgroundColor: P.paper,
        borderRadius: 10,
        paddingHorizontal: SPACE.md,
        paddingVertical: SPACE.sm + 2,
        marginBottom: SPACE.sm,
        gap: SPACE.sm,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: SPACE.sm }}>
        <Text
          style={{
            color: P.ink,
            fontFamily: "Newsreader",
            fontSize: 20,
            lineHeight: frenchLineHeight(20),
          }}
        >
          {entry.fr}
        </Text>
        <Pressable
          onPress={() => onSay(entry.fr)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={`Listen to ${entry.fr}`}
        >
          <Volume2 size={15} color={P.ink3} />
        </Pressable>
      </View>

      <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>{entry.en}</Text>

      {Boolean(item.exampleFr) && (
        <View>
          <Text style={{ color: P.ink3, fontSize: 11, letterSpacing: 0.3 }}>In use</Text>
          <Text
            style={{
              color: P.ink,
              fontFamily: "Newsreader",
              fontSize: 15,
              lineHeight: frenchLineHeight(15),
              marginTop: 1,
            }}
          >
            {item.exampleFr}
          </Text>
          {Boolean(item.exampleEn) && (
            <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 18 }}>{item.exampleEn}</Text>
          )}
        </View>
      )}

      {Boolean(metIn) && (
        <View>
          <Text style={{ color: P.ink3, fontSize: 11, letterSpacing: 0.3 }}>Where you met it</Text>
          <Text style={{ color: P.ink2, fontSize: 13, lineHeight: 19, marginTop: 1 }}>{metIn}</Text>
        </View>
      )}

      {related.length > 0 && (
        <View>
          <Text style={{ color: P.ink3, fontSize: 11, letterSpacing: 0.3 }}>Travels with</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
            {related.map((r, i) => (
              <View
                key={`${r.en}-${i}`}
                style={{
                  backgroundColor: P.bg,
                  borderWidth: 1,
                  borderColor: P.border,
                  borderRadius: 9999,
                  paddingHorizontal: 9,
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{ fontSize: 12, lineHeight: frenchLineHeight(12), color: P.ink2 }}
                >
                  {String((r as { text?: string }).text ?? r.en ?? "")}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {onPractise !== undefined && (
        <Pressable
          onPress={onPractise}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel={`Practise the lesson where you met ${entry.fr}`}
          style={{ alignSelf: "flex-start" }}
        >
          <Text style={{ color: P.red, fontSize: 13, lineHeight: 19 }}>Practise this</Text>
        </Pressable>
      )}
    </View>
  );
}
