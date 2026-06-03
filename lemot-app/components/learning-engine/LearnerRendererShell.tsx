import { View, Text } from "react-native";
import { P } from "@/constants/theme";
import { LearnerLessonHeader } from "./LearnerLessonHeader";

/**
 * Learner renderer shell (P3.2 skeleton).
 *
 * The first learner-facing surface over the learning-engine contracts — calm,
 * premium, and LABEL-FREE (no exercise/lesson ids, no operation labels, no
 * ownership-bucket names, no validator language). P3.2 renders only the lesson
 * header + a placeholder card area; real operation cards arrive in P3.3+.
 *
 * Pure presentation: NO events, NO LocalRepository, NO grade()/scoreEvents(),
 * NO storage / network / AI. It receives the lesson's learner-friendly `canDo`
 * string and nothing else.
 */
export function LearnerRendererShell({ canDo }: { canDo: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: P.bg, paddingTop: 64 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 24, gap: 16 }}>
        <LearnerLessonHeader canDo={canDo} />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: P.border,
              backgroundColor: P.paper,
              padding: 24,
              gap: 6,
            }}
          >
            <Text
              style={{ color: P.ink3, fontSize: 13, fontFamily: "Outfit" }}
            >
              Coming up
            </Text>
            <Text
              style={{
                color: P.ink2,
                fontSize: 16,
                lineHeight: 24,
                fontFamily: "Newsreader",
              }}
            >
              Your first card will appear here.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
