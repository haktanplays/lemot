import { View, Text } from "react-native";
import {
  MessageSquare,
  Lightbulb,
  AlertTriangle,
  Globe2,
  Music,
  Unlock,
} from "lucide-react-native";
import { P } from "@/constants/theme";
import type {
  Expression,
  GrammarNugget,
  FauxAmi,
  SoundPattern,
} from "@/lib/types";

export type UnlockType =
  | "expression"
  | "grammarNugget"
  | "fauxAmi"
  | "cultureBite"
  | "soundPattern";

interface UnlockCardProps {
  type: UnlockType;
  data: Expression | GrammarNugget | FauxAmi | string | SoundPattern;
}

const BLUE = "#3498DB";

const CONFIG: Record<
  UnlockType,
  { color: string; label: string; icon: typeof MessageSquare }
> = {
  expression: { color: P.purple, label: "Expression", icon: MessageSquare },
  grammarNugget: { color: P.amber, label: "Grammar Nugget", icon: Lightbulb },
  fauxAmi: { color: P.red, label: "Faux Ami", icon: AlertTriangle },
  cultureBite: { color: P.green, label: "Culture Bite", icon: Globe2 },
  soundPattern: { color: BLUE, label: "Sound Pattern", icon: Music },
};

export function UnlockCard({ type, data }: UnlockCardProps) {
  const cfg = CONFIG[type];
  const Icon = cfg.icon;

  return (
    <View
      className="bg-lm-paper rounded-xl p-4 mt-4 w-full"
      style={{ borderWidth: 2, borderColor: cfg.color }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-2 mb-3">
        <Unlock size={14} color={cfg.color} />
        <Text
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: cfg.color }}
        >
          {cfg.label} Unlocked
        </Text>
        <Icon size={14} color={cfg.color} />
      </View>

      {/* Content based on type */}
      {type === "expression" && renderExpression(data as Expression)}
      {type === "grammarNugget" && renderNugget(data as GrammarNugget)}
      {type === "fauxAmi" && renderFauxAmi(data as FauxAmi)}
      {type === "cultureBite" && renderCulture(data as string)}
      {type === "soundPattern" && renderSound(data as SoundPattern)}
    </View>
  );
}

function renderExpression(d: Expression) {
  return (
    <View>
      <Text className="text-base font-bold text-lm-ink mb-1">{d.fr}</Text>
      <Text className="text-sm text-lm-ink2 mb-2">{d.en}</Text>
      <Text className="text-xs text-lm-ink3 italic mb-1">{d.usage}</Text>
      {d.literal && (
        <Text className="text-xs text-lm-ink3">
          Literally: "{d.literal}"
        </Text>
      )}
    </View>
  );
}

function renderNugget(d: GrammarNugget) {
  return (
    <View>
      <Text className="text-sm font-bold text-lm-ink mb-1">{d.title}</Text>
      <Text className="text-xs text-lm-ink2 leading-5 mb-1">{d.insight}</Text>
      {d.example && (
        <Text className="text-xs text-lm-ink3 italic mt-1">{d.example}</Text>
      )}
    </View>
  );
}

function renderFauxAmi(d: FauxAmi) {
  return (
    <View>
      <View className="flex-row items-center gap-2 mb-1">
        <Text className="text-base font-bold text-lm-ink">{d.fr}</Text>
        <Text className="text-xs text-lm-ink3">looks like "{d.looksLike}"</Text>
      </View>
      <Text className="text-sm text-lm-red font-semibold mb-1">
        Actually means: {d.actualMeaning}
      </Text>
      <Text className="text-xs text-lm-ink3 italic">{d.example}</Text>
    </View>
  );
}

function renderCulture(text: string) {
  return (
    <Text className="text-xs text-lm-ink2 leading-5">{text}</Text>
  );
}

function renderSound(d: SoundPattern) {
  return (
    <View>
      <Text className="text-sm font-bold text-lm-ink mb-1">{d.pattern}</Text>
      <Text className="text-xs text-lm-ink2 leading-5 mb-2">{d.rule}</Text>
      {d.examples.map((ex, i) => (
        <Text key={i} className="text-xs text-lm-ink3 mb-0.5">
          {ex.fr} = {ex.en}
        </Text>
      ))}
    </View>
  );
}
