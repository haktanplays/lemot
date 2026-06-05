import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { P } from "@/constants/theme";

/**
 * Founder-local privacy disclosure (P5.4B) — DUMB, calm one-time notice.
 *
 * Shown once in the founder/sandbox learner route before practice when the local
 * disclosure has not yet been acknowledged. It is a SOFT local-first disclosure,
 * NOT a remote-consent gate: a single "Got it" dismisses it. It asks for NO tester
 * or account consent and enables NO remote sync.
 *
 * Presentation only — the parent's hook owns reading/persisting privacy state.
 * It NEVER renders raw PrivacyState JSON, consent versions, storage keys, or
 * technical ids — only plain reassurance copy.
 */
export function FounderPrivacyNotice({
  saving,
  error,
  onAcknowledge,
}: {
  saving: boolean;
  error: boolean;
  onAcknowledge: () => void;
}) {
  return (
    <View style={screen}>
      <View style={card}>
        <Text style={title}>Before you start</Text>
        <Text style={body}>
          This is a local-first founder build. Your answers, mistakes, progress,
          and your Mon Lexique and Practice Pool are stored only on this device.
        </Text>
        <Text style={body}>
          Remote sync isn&rsquo;t enabled in this build — nothing is uploaded.
        </Text>
        <Text style={body}>
          You can keep practicing. Ways to export or delete your data will arrive
          in a later privacy &amp; settings screen.
        </Text>

        <Pressable
          onPress={saving ? undefined : onAcknowledge}
          disabled={saving}
          style={[primaryBtn, saving ? dimmed : null]}
        >
          <Text style={primaryBtnText}>{saving ? "Saving…" : "Got it"}</Text>
        </Pressable>

        {error ? (
          <Text style={errorText}>
            Couldn&rsquo;t save that just now. Please try again.
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const screen: ViewStyle = {
  flex: 1,
  backgroundColor: P.bg,
  paddingTop: 64,
  paddingHorizontal: 20,
  justifyContent: "center",
};
const card: ViewStyle = {
  borderRadius: 16,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  padding: 20,
  gap: 12,
};
const title: TextStyle = {
  color: P.ink,
  fontSize: 20,
  lineHeight: 28,
  fontFamily: "Newsreader",
};
const body: TextStyle = {
  color: P.ink2,
  fontSize: 15,
  lineHeight: 23,
  fontFamily: "Newsreader",
};
const primaryBtn: ViewStyle = {
  alignSelf: "flex-start",
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.red,
  paddingHorizontal: 20,
  paddingVertical: 9,
  marginTop: 4,
};
const dimmed: ViewStyle = { opacity: 0.5 };
const primaryBtnText: TextStyle = {
  color: P.red,
  fontSize: 14,
  fontFamily: "Outfit",
};
const errorText: TextStyle = {
  color: P.amber,
  fontSize: 13,
  fontFamily: "Outfit",
};
